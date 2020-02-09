const path = require("path");

module.exports = {
  stories: ["../packages/**/*.stories.[tj]sx"],
  addons: [
    {
      name: "@storybook/preset-typescript",
      options: {
        include: [path.resolve(__dirname, "../packages")],
      },
    },
  ],
};
