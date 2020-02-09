/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const {
  introspectSchema,
  makeRemoteExecutableSchema,
} = require("apollo-server");
const { HttpLink } = require("apollo-link-http");
const fetch = require("node-fetch");

require("ts-node").register({ transpileOnly: true, skipProject: true });
const { getEnvConfig } = require("../src/config/env");

const { apiUrl } = getEnvConfig();

module.exports = (async () => {
  const link = new HttpLink({ uri: apiUrl, fetch });
  const schema = await introspectSchema(link);

  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  });

  return executableSchema;
})();
