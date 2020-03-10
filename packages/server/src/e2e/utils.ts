/* eslint-disable import/no-extraneous-dependencies */
import {
  execute,
  FetchResult,
  GraphQLRequest,
  Observable,
  toPromise as apolloLinkToPromise,
} from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import sqlite3 from "sqlite3";
import { getEnvConfig } from "../config/env";

const { port, host, protocol, database } = getEnvConfig();

export const toPromise = apolloLinkToPromise;

export const createCallGraphql: CreateCallGraphql = async () => {
  const url = `${protocol}://${host}:${port}/graphql`;

  const link = new HttpLink({
    uri: url,
    fetch: fetch as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  const callGraphql: CallGraphql = ({ query, variables }) =>
    execute(link, { query, variables });

  return callGraphql;
};

export const clearDatabase = (): void => {
  if (database.type === "postgres")
    throw new Error("Attempted to clear Postgres, only SQLite is supported.");

  const { Database } = sqlite3.verbose();
  const db = new Database(database.path);
  db.each(
    'SELECT name FROM sqlite_master WHERE type = "table"',
    (error, table) => {
      if (error) throw error;
      db.run(`DELETE FROM ${table.name}`);
    },
    () => db.close(),
  );
};

// types
type Operation = Pick<GraphQLRequest, "query" | "variables">;
export type CallGraphql = (operation: Operation) => Observable<FetchResult>;
type CreateCallGraphql = () => Promise<CallGraphql>;
