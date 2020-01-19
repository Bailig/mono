interface EnvConfig {
  id: string;
  serverPort: number;
  database: string;
  host: string;
  protocol: string;
}

type EnvKey = "development" | "testing" | "staging" | "production";

const envConfigs: Record<EnvKey, EnvConfig> = {
  development: {
    id: "development",
    serverPort: 5000,
    database: "mono-db-development",
    host: "0.0.0.0",
    protocol: "http",
  },
  testing: {
    id: "testing",
    serverPort: 5000,
    database: "mono-db-testing",
    host: "0.0.0.0",
    protocol: "http",
  },
  staging: {
    id: "staging",
    serverPort: 8080,
    database: "mono-db-staging",
    host: "0.0.0.0",
    protocol: "https",
  },
  production: {
    id: "production",
    serverPort: 8080,
    database: "mono-db-production",
    host: "0.0.0.0",
    protocol: "https",
  },
};

const envKeys = Object.keys(envConfigs);

const getEnvConfig = (): EnvConfig => {
  if (!envKeys.includes(process.env.NODE_ENV)) {
    throw new Error(
      `The NODE_ENV environment variable is required to be one of ${envKeys.join(
        ", ",
      )} but got ${process.env.NODE_ENV}.`,
    );
  }

  return envConfigs[process.env.NODE_ENV];
};

export const envConfig = getEnvConfig();
