/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

// this file is only used for typeorm cli

const { getEnvConfig } = require("./src/config/env");

const { database } = getEnvConfig("development");

module.exports = {
  type: database.type,
  database: database.name,
  entities: database.entities,
  migrations: database.migrations,
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/migrations",
    subscribersDir: "src/subscribers",
  },
};
