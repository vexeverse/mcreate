const fs = require("fs");
const path = require("path");

const color = {
  black: "\x1b[30m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

const checkParts = [
  { name: "Table", path: "components/private/Table" },
  { name: "Form", path: "components/private/Form" },
  { name: "Profile", path: "components/private/Profile" },
  { name: "Module", path: "modules" },
  { name: "Page", path: "pages" },
  { name: "API", path: "services" },
];

function divider() {
  console.log(`----------------------------------------`);
}

async function check(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = {};

      checkParts.forEach((component) => {
        const componentPath = component.path + url;
        result[component.name] = fs.existsSync(componentPath) ? "✅" : "⛔️";
      });

      Object.entries(result).forEach(([name, status]) => {
        console.log(`${status} ${name}`);
      });

      divider();

      const successCount = Object.values(result).filter(
        (status) => status === "✅"
      ).length;

      if (successCount === 6) {
        resolve(
          "Folder paths OK! All " +
            color.green +
            successCount +
            " of 6" +
            color.white +
            " fulfilled"
        );
      } else {
        const errorReason =
          "Folder paths are not available. Only " +
          color.red +
          successCount +
          " of 6" +
          color.white +
          " fulfilled";
        reject(errorReason);
      }
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  check,
};
