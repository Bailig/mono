import { DataProxy } from "apollo-cache";
import { DocumentNode } from "graphql";

export const updateQueryHelper = <T>(
  store: DataProxy,
  query: DocumentNode,
  updateQuery: (queryData: T) => T,
): void => {
  const queryData = store.readQuery<T>({ query });
  if (!queryData) throw new Error("Queried data does not exist in cache");

  const newData = updateQuery(queryData);
  store.writeQuery({
    query,
    data: newData,
  });
};
