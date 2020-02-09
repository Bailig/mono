import { gql } from "apollo-server-express";

export const GetTodosDocument = gql`
  query getTodos {
    todos {
      id
      content
      isCompleted
    }
  }
`;
