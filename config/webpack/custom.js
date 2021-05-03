const path = require("path");

module.exports = {
  resolve: {
    alias: {
      apis: "src/apis",
      common: "src/common",
      components: "src/components",
      contexts: "src/contexts",
      reducers: "src/reducers",
      images: path.resolve(__dirname, "..", "..", "app/assets/images"),
    },
  },
};