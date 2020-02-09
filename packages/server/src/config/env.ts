import path from "path";

const resolvePackage = (relativePath: string): string =>
  path.resolve(__dirname, `../../${relativePath}`);

const envConfigs: Record<EnvKey, EnvConfig> = {
  development: {
    id: "development",
    port: 5001,
    database: {
      type: "sqlite",
      path: resolvePackage("data/mono-development.sqlite"),
      logging: true,
      dropSchema: false,
      entities: [resolvePackage("src/entities/**/*.ts")],
      migrations: [resolvePackage("src/migrations/**/*.ts")],
      subscribers: [resolvePackage("src/subscribers/**/*.ts")],
    },
    session: {
      store: { type: "sqlite", path: "data/mono-development.sqlite" },
    },
    host: "0.0.0.0",
    protocol: "http",
  },
  test: {
    id: "test",
    port: 2001,
    database: {
      type: "sqlite",
      path: resolvePackage("data/mono-test.sqlite"),
      logging: false,
      dropSchema: true,
      entities: [resolvePackage("src/entities/**/*.ts")],
      migrations: [resolvePackage("src/migrations/**/*.ts")],
      subscribers: [resolvePackage("src/subscribers/**/*.ts")],
    },
    session: {
      store: { type: "sqlite", path: "data/mono-test.sqlite" },
    },
    host: "0.0.0.0",
    protocol: "http",
  },
  production: {
    id: "production",
    port: 8001,
    database: {
      type: "postgres",
      url:
        process.env.DATABASE_URL ||
        "postgresql://root:password@localhost:5432/mono-production",
      logging: false,
      dropSchema: false,
      entities: [resolvePackage("build/entities/**/*.js")],
      migrations: [resolvePackage("build/migrations/**/*.js")],
      subscribers: [resolvePackage("build/subscribers/**/*.js")],
    },
    session: {
      store: {
        type: "redis",
        url: process.env.CACHE_URL || "redis://:password@localhost:6379/0",
      },
    },
    host: "0.0.0.0",
    protocol: "http", // TODO: change to https in production
  },
};

const envKeys = Object.keys(envConfigs);

export const getEnvConfig = (envKey?: EnvKey): EnvConfig => {
  const nodeEnv = envKey || process.env?.NODE_ENV;

  if (!nodeEnv || !envKeys.includes(nodeEnv)) {
    throw new Error(
      `The NODE_ENV environment variable is required to be one of '${envKeys.join(
        ", ",
      )}' but got '${process.env.NODE_ENV}'.`,
    );
  }

  return envConfigs[nodeEnv as EnvKey];
};

// ---------- types ----------

interface DatabaseConfig {
  type: string;
  dropSchema: boolean;
  logging: boolean;
  entities: string[];
  migrations?: string[];
  subscribers?: string[];
}

interface SqliteConfig extends DatabaseConfig {
  type: "sqlite";
  path: string;
}

interface PostgresConfig extends DatabaseConfig {
  type: "postgres";
  url: string; // postgres://user:password@host:381/database
}

interface SessionConfig {
  store: { type: "sqlite"; path: string } | CacheConfig;
}

interface CacheConfig {
  type: "redis";
  url: string; // "redis://:password@host:6380/database"
}

interface EnvConfig {
  id: string;
  port: number;
  database: SqliteConfig | PostgresConfig;
  session: SessionConfig;
  host: string;
  protocol: "http" | "https";
}

type EnvKey = "development" | "test" | "production";
