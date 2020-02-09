const envConfigs: Record<EnvKey, EnvConfig> = {
  development: {
    id: "development",
    port: 5000,
    host: "0.0.0.0",
    protocol: "http",
    apiUrl: "http://localhost:5001/graphql",
  },
  test: {
    id: "test",
    port: 2000,
    host: "0.0.0.0",
    protocol: "http",
    apiUrl: "http://localhost:2001/graphql",
  },
  production: {
    id: "production",
    port: 8000,
    host: "0.0.0.0",
    protocol: "http",
    apiUrl: "/graphql",
  },
};

const envKeys = Object.keys(envConfigs);

export const getEnvConfig = (): EnvConfig => {
  const nodeEnv = process.env?.NODE_ENV;

  if (!nodeEnv || !envKeys.includes(nodeEnv)) {
    throw new Error(
      `The NODE_ENV environment variable is required to be one of '${envKeys.join(
        ", ",
      )}' but got '${process.env.NODE_ENV}'.`,
    );
  }

  return envConfigs[nodeEnv as EnvKey];
};

const envConfig = getEnvConfig();

export const servedUrl = `${envConfig.protocol}/${envConfig.host}:${envConfig.port}`;
export const rawEnv = {
  "process.env": {
    NODE_ENV: `"${process.env.NODE_ENV}"`,
  },
};

// ---------- types ----------

interface EnvConfig {
  id: string;
  port: number;
  host: string;
  protocol: "http" | "https";
  apiUrl: string;
}

type EnvKey = "development" | "production" | "test";
