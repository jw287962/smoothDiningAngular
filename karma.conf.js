module.exports = function (config) {
  config.set({
    // ...

    // Define the list of plugins to use
    plugins: [
      // ...
      require("karma-chrome-launcher"),
      require("karma-jasmine"),
      // ...
    ],

    // Define the browsers to use
    browsers: ["CustomChrome"],

    // Define custom browser launchers
    customLaunchers: {
      // Use Puppeteer as the browser launcher
      CustomChrome: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-gpu"],
      },
    },
  });
};
