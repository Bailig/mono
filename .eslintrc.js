module.exports = {
  plugins: [
    "@typescript-eslint",
    "eslint-comments",
    "jest",
    "promise",
    "unicorn",
    "cypress",
  ],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
    "plugin:cypress/recommended",
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
    "cypress/globals": true,
  },
  ignorePatterns: [
    "**/node_modules",
    "**/generated",
    "**/build",
    "cypress/integration/examples/*",
  ],
  rules: {
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": "off",
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    "react/jsx-filename-extension": "off",
    // Use function hoisting to improve code readability
    "no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true },
    ],
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
    // Unnecessary in typescript
    "react/prop-types": "off",
    // Too restrictive
    "eslint-comments/disable-enable-pair": "off",
    // Conflicts with ramda placeholder,
    "no-underscore-dangle": "off",
  },
  overrides: [
    {
      files: ["packages/server/**/*.ts"],
      rules: {
        // typeoem entities and migration classes often don't use this
        "class-methods-use-this": "off",
      },
    },
    {
      files: ["cypress/**/*.js"],
      rules: {
        "jest/expect-expect": "off",
        "jest/valid-expect": "off",
        "jest/valid-expect-in-promise": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/triple-slash-reference": "off",
        "import/no-extraneous-dependencies": "off",
        "spaced-comment": "off",
      },
    },
    {
      files: ["packages/**/*.stories.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["packages/*/index.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "import/no-unresolved": "off",
      },
    },
  ],
};
