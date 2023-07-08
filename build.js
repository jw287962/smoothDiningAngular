const fs = require("fs-extra");

const { execSync } = require("child_process");
console.log("preparing build");
const distBase = "dist/smooth-dining-angular/";
fs.copySync("./src/404.html", `${distBase}404.html`);
fs.copySync("./src/_redirects", `${distBase}`);
