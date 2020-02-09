/* eslint-disable no-console */
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import connectSqlite3 from "connect-sqlite3";
import express, { Express } from "express";
import session from "express-session";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ConnectionOptions, createConnection } from "typeorm";
import { getEnvConfig } from "./config/env";
import { TodoResolver } from "./resolvers";

const {
  protocol,
  database,
  session: { store },
} = getEnvConfig();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSessionStore = (): any => {
  if (store.type === "sqlite") {
    const SQLiteStore = connectSqlite3(session);
    return new SQLiteStore({
      db: store.path,
      concurrentDB: true,
    });
  }
  const RedisStore = connectRedis(session);
  const client = new Redis(store.url);
  return new RedisStore({ client });
};

export const getApp = async (): Promise<Express> => {
  const app = express();

  app.use(
    session({
      store: getSessionStore(),
      name: "mono-session",
      secret: "snjakdbi1p98gfohnlj;p",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: protocol === "https",
        maxAge: 1000 * 60 * 60 * 24 * 30, // 1 month
      },
    }),
  );

  const connection = await createConnection({
    type: database.type,
    database: database.type === "sqlite" ? database.path : undefined,
    url: database.type === "postgres" ? database.url : undefined,
    synchronize: true, // TODO: change to false and use migrations once we have live data.
    dropSchema: database.dropSchema,
    logging: database.logging,
    entities: database.entities,
    migrations: database.migrations,
  } as ConnectionOptions);

  await connection.runMigrations();

  try {
    const apolloServer = new ApolloServer({
      schema: await buildSchema({ resolvers: [TodoResolver], validate: false }),
      context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: true });
    return app;
  } catch (error) {
    // used for showing the details of 'generating schema error'
    console.error(error);
    throw error;
  }
};
