import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import React, { FC } from "react";
import { getEnvConfig } from "./config/env";
import { Routes } from "./routes";

const { apiUrl } = getEnvConfig();

const client = new ApolloClient({
  uri: apiUrl,
});

export const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};
