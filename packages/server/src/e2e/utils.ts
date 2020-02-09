// required to set NODE_ENV before importing config files
process.env.NODE_ENV = "test";

/* eslint-disable import/first, import/no-extraneous-dependencies */
import {
  execute,
  FetchResult,
  GraphQLRequest,
  Observable,
  toPromise as apolloLinkToPromise,
} from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";
import { getApp } from "../app";
import { getEnvConfig } from "../config/env";
/* eslint-enable import/first, import/no-extraneous-dependencies */

const { port, host, protocol } = getEnvConfig();

export const toPromise = apolloLinkToPromise;

export const startTestServer: StartTestServer = async () => {
  const app = await getApp();
  // TODO: remove following. the test server should start from command line
  const httpServer = app.listen({ port });
  const url = `${protocol}://${host}:${port}/graphql`;

  console.log(`test server started at ${url}`); // eslint-disable-line no-console

  const link = new HttpLink({
    uri: url,
    fetch: fetch as any, // eslint-disable-line @typescript-eslint/no-explicit-any
  });

  const callGraphql: CallServer = ({ query, variables }) =>
    execute(link, { query, variables });

  return {
    stop: () => httpServer.close(),
    callServer: callGraphql,
  };
};

// types
type Operation = Pick<GraphQLRequest, "query" | "variables">;
export type CallServer = (operation: Operation) => Observable<FetchResult>;
type StartTestServer = () => Promise<{
  stop: () => void;
  callServer: CallServer;
}>;
