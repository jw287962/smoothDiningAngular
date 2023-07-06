const fs = require("fs-extra");

const { execSync } = require("child_process");
console.log("preparing build");
fs.copySync("./src/404.html", "dist/smooth-dining-angular/404.html");
