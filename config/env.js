
const environmentConfigs = {
  development: {
    id: 'development',
    serverPort: 5000,
    database: 'mono-db-development',
    host: '0.0.0.0',
    protocol: 'http',
  },
  testing: {
    id: 'testing',
    serverPort: 5000,
    database: 'mono-db-testing',
    host: '0.0.0.0',
    protocol: 'http',
  },
  staging: {
    id: 'staging',
    serverPort: 8080,
    database: 'mono-db-staging',
    host: '0.0.0.0',
    protocol: 'https',
  },
  production: {
    id: 'production',
    serverPort: 8080,
    database: 'mono-db-production',
    host: '0.0.0.0',
    protocol: 'https',
  },
};

const environments = Object.keys(environmentConfigs);

const getEnvironmentConfig = () => {
  if (environments.indexOf(process.env.NODE_ENV) === -1) {
    throw new Error(
      `The NODE_ENV environment variable is required to be one of ${environments.join(', ')} but got ${process.env.NODE_ENV}.`,
    );
  }
  return environmentConfigs[process.env.NODE_ENV];
};

module.exports = getEnvironmentConfig();
