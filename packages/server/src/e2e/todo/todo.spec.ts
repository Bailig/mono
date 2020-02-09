import { CallServer, startTestServer, toPromise } from "../utils";
import {
  CompleteTodoDocument,
  CreateTodoDocument,
  DeleteTodoDocument,
  UpdateTodoContentDocument,
} from "./mutations";
import { GetTodosDocument } from "./queries";

describe("todo", () => {
  let stop: () => void;
  let callServer: CallServer;
  const todo = { content: "test todo" };
  let id: string;

  beforeAll(async () => {
    const testServer = await startTestServer();
    stop = testServer.stop;
    callServer = testServer.callServer;
  });

  afterAll(() => stop && stop());

  it("should be created", async () => {
    const res = await toPromise(
      callServer({
        query: CreateTodoDocument,
        variables: { input: todo },
      }),
    );
    id = res.data?.createTodo.todo.id;

    expect(res).toMatchSnapshot({
      data: {
        createTodo: {
          todo: { id: expect.any(String) },
        },
      },
    });
  });

  it("shouldn't be created with empty content", async () => {
    const res = await toPromise(
      callServer({
        query: CreateTodoDocument,
        variables: { input: { content: "  " } },
      }),
    );

    expect(res).toMatchSnapshot();
  });

  it("should be queried as an array", async () => {
    const res = await toPromise(callServer({ query: GetTodosDocument }));

    expect(res).toMatchSnapshot({
      data: {
        todos: [{ id: expect.any(String) }],
      },
    });
  });

  it("should be updated with new content", async () => {
    const res = await toPromise(
      callServer({
        query: UpdateTodoContentDocument,
        variables: { input: { id, content: "test todo updated" } },
      }),
    );

    expect(res).toMatchSnapshot({
      data: {
        updateTodoContent: {
          todo: { id: expect.any(String) },
        },
      },
    });
  });

  it("shouldn't be updated with empty content", async () => {
    const res = await toPromise(
      callServer({
        query: UpdateTodoContentDocument,
        variables: { input: { id, content: " " } },
      }),
    );

    expect(res).toMatchSnapshot();
  });

  it("should be completed", async () => {
    const res = await toPromise(
      callServer({
        query: CompleteTodoDocument,
        variables: { input: { id } },
      }),
    );

    expect(res).toMatchSnapshot({
      data: {
        completeTodo: {
          todo: { id: expect.any(String) },
        },
      },
    });
  });

  it("should be deleted", async () => {
    const res = await toPromise(
      callServer({
        query: DeleteTodoDocument,
        variables: { input: { id } },
      }),
    );

    expect(res).toMatchSnapshot({
      data: {
        deleteTodo: {
          deletedTodoId: expect.any(String),
        },
      },
    });
  });
});
