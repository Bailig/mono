import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CompleteTodoInput = {
  id: Scalars["ID"];
};

export type CompleteTodoPayload = {
  __typename?: "CompleteTodoPayload";
  userErrors: Array<UserError>;
  todo?: Maybe<Todo>;
};

export type CreateTodoInput = {
  content: Scalars["String"];
};

export type CreateTodoPayload = {
  __typename?: "CreateTodoPayload";
  userErrors: Array<UserError>;
  todo?: Maybe<Todo>;
};

export type DeleteTodoInput = {
  id: Scalars["ID"];
};

export type DeleteTodoPayload = {
  __typename?: "DeleteTodoPayload";
  userErrors: Array<UserError>;
  deletedTodoId?: Maybe<Scalars["ID"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createTodo: CreateTodoPayload;
  deleteTodo: DeleteTodoPayload;
  updateTodoContent: UpdateTodoContentPayload;
  completeTodo: CompleteTodoPayload;
};

export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};

export type MutationDeleteTodoArgs = {
  input: DeleteTodoInput;
};

export type MutationUpdateTodoContentArgs = {
  input: UpdateTodoContentInput;
};

export type MutationCompleteTodoArgs = {
  input: CompleteTodoInput;
};

export type Query = {
  __typename?: "Query";
  todos: Array<Todo>;
};

export type Todo = {
  __typename?: "Todo";
  id: Scalars["ID"];
  content: Scalars["String"];
  isCompleted: Scalars["Boolean"];
};

export type UpdateTodoContentInput = {
  id: Scalars["ID"];
  content: Scalars["String"];
};

export type UpdateTodoContentPayload = {
  __typename?: "UpdateTodoContentPayload";
  userErrors: Array<UserError>;
  todo?: Maybe<Todo>;
};

export type UserError = {
  __typename?: "UserError";
  message: Scalars["String"];
  path: Scalars["String"];
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput;
};

export type DeleteTodoMutation = { __typename?: "Mutation" } & {
  deleteTodo: { __typename?: "DeleteTodoPayload" } & Pick<
    DeleteTodoPayload,
    "deletedTodoId"
  > & {
      userErrors: Array<
        { __typename?: "UserError" } & Pick<UserError, "message">
      >;
    };
};

export type CompleteTodoMutationVariables = {
  input: CompleteTodoInput;
};

export type CompleteTodoMutation = { __typename?: "Mutation" } & {
  completeTodo: { __typename?: "CompleteTodoPayload" } & {
    userErrors: Array<
      { __typename?: "UserError" } & Pick<UserError, "message">
    >;
    todo: Maybe<{ __typename?: "Todo" } & Pick<Todo, "id">>;
  };
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput;
};

export type CreateTodoMutation = { __typename?: "Mutation" } & {
  createTodo: { __typename?: "CreateTodoPayload" } & {
    userErrors: Array<
      { __typename?: "UserError" } & Pick<UserError, "message">
    >;
    todo: Maybe<
      { __typename?: "Todo" } & Pick<Todo, "id" | "content" | "isCompleted">
    >;
  };
};

export type GetTodosQueryVariables = {};

export type GetTodosQuery = { __typename?: "Query" } & {
  todos: Array<
    { __typename?: "Todo" } & Pick<Todo, "id" | "content" | "isCompleted">
  >;
};

export const DeleteTodoDocument = gql`
  mutation deleteTodo($input: DeleteTodoInput!) {
    deleteTodo(input: $input) {
      userErrors {
        message
      }
      deletedTodoId
    }
  }
`;
export type DeleteTodoMutationFn = ApolloReactCommon.MutationFunction<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
>;

/**
 * __useDeleteTodoMutation__
 *
 * To run a mutation, you first call `useDeleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTodoMutation, { data, loading, error }] = useDeleteTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteTodoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteTodoMutation,
    DeleteTodoMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    DeleteTodoMutation,
    DeleteTodoMutationVariables
  >(DeleteTodoDocument, baseOptions);
}
export type DeleteTodoMutationHookResult = ReturnType<
  typeof useDeleteTodoMutation
>;
export type DeleteTodoMutationResult = ApolloReactCommon.MutationResult<
  DeleteTodoMutation
>;
export type DeleteTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteTodoMutation,
  DeleteTodoMutationVariables
>;
export const CompleteTodoDocument = gql`
  mutation completeTodo($input: CompleteTodoInput!) {
    completeTodo(input: $input) {
      userErrors {
        message
      }
      todo {
        id
      }
    }
  }
`;
export type CompleteTodoMutationFn = ApolloReactCommon.MutationFunction<
  CompleteTodoMutation,
  CompleteTodoMutationVariables
>;

/**
 * __useCompleteTodoMutation__
 *
 * To run a mutation, you first call `useCompleteTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeTodoMutation, { data, loading, error }] = useCompleteTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCompleteTodoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CompleteTodoMutation,
    CompleteTodoMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CompleteTodoMutation,
    CompleteTodoMutationVariables
  >(CompleteTodoDocument, baseOptions);
}
export type CompleteTodoMutationHookResult = ReturnType<
  typeof useCompleteTodoMutation
>;
export type CompleteTodoMutationResult = ApolloReactCommon.MutationResult<
  CompleteTodoMutation
>;
export type CompleteTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CompleteTodoMutation,
  CompleteTodoMutationVariables
>;
export const CreateTodoDocument = gql`
  mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      userErrors {
        message
      }
      todo {
        id
        content
        isCompleted
      }
    }
  }
`;
export type CreateTodoMutationFn = ApolloReactCommon.MutationFunction<
  CreateTodoMutation,
  CreateTodoMutationVariables
>;

/**
 * __useCreateTodoMutation__
 *
 * To run a mutation, you first call `useCreateTodoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTodoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTodoMutation, { data, loading, error }] = useCreateTodoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateTodoMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateTodoMutation,
    CreateTodoMutationVariables
  >,
) {
  return ApolloReactHooks.useMutation<
    CreateTodoMutation,
    CreateTodoMutationVariables
  >(CreateTodoDocument, baseOptions);
}
export type CreateTodoMutationHookResult = ReturnType<
  typeof useCreateTodoMutation
>;
export type CreateTodoMutationResult = ApolloReactCommon.MutationResult<
  CreateTodoMutation
>;
export type CreateTodoMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateTodoMutation,
  CreateTodoMutationVariables
>;
export const GetTodosDocument = gql`
  query getTodos {
    todos {
      id
      content
      isCompleted
    }
  }
`;

/**
 * __useGetTodosQuery__
 *
 * To run a query within a React component, call `useGetTodosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTodosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTodosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTodosQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetTodosQuery,
    GetTodosQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<GetTodosQuery, GetTodosQueryVariables>(
    GetTodosDocument,
    baseOptions,
  );
}
export function useGetTodosLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetTodosQuery,
    GetTodosQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<GetTodosQuery, GetTodosQueryVariables>(
    GetTodosDocument,
    baseOptions,
  );
}
export type GetTodosQueryHookResult = ReturnType<typeof useGetTodosQuery>;
export type GetTodosLazyQueryHookResult = ReturnType<
  typeof useGetTodosLazyQuery
>;
export type GetTodosQueryResult = ApolloReactCommon.QueryResult<
  GetTodosQuery,
  GetTodosQueryVariables
>;
