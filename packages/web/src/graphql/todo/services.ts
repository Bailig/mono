import { DataProxy } from "apollo-cache";
import { GetTodosDocument, GetTodosQuery } from "../../generated/graphql";
import { updateQueryHelper } from "../utils";

export const updateGetTodosQueryHelper = (
  store: DataProxy,
  updateQuery: (queryDaya: GetTodosQuery) => GetTodosQuery,
): void =>
  updateQueryHelper<GetTodosQuery>(store, GetTodosDocument, updateQuery);
