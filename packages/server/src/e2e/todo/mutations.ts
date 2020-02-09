import { gql } from "apollo-server-express";

export const CreateTodoDocument = gql`
  mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      userErrors {
        message
        path
      }
      todo {
        id
        content
        isCompleted
      }
    }
  }
`;

export const UpdateTodoContentDocument = gql`
  mutation updateTodoContent($input: UpdateTodoContentInput!) {
    updateTodoContent(input: $input) {
      userErrors {
        message
        path
      }
      todo {
        id
        content
        isCompleted
      }
    }
  }
`;

export const CompleteTodoDocument = gql`
  mutation completeTodo($input: CompleteTodoInput!) {
    completeTodo(input: $input) {
      userErrors {
        message
        path
      }
      todo {
        id
        content
        isCompleted
      }
    }
  }
`;

export const DeleteTodoDocument = gql`
  mutation deleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      userErrors {
        message
        path
      }
      deletedTodoId
    }
  }
`;
