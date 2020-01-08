module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    "plugin:monorepo/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint",
  ],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".tsx", ".js", ".jsx"]
      }
    }
  },
  "rules": {
    "import/extensions": "off",
  }
};