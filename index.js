const fs = require("fs");
const path = require("path");

//function
const { check } = require("./functions/check");
const { generate } = require("./functions/generate");

// COLOR DICTIONARY

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

// INTRODUCTION

function divider() {
  console.log(`----------------------------------------`);
}
divider();
console.log(`${color.black}VUI MODULE GENERATOR${color.white}`);
divider();

const operations = ["generate", "check", "delete"];

//FUNCTIONALITIES

//checker

async function del(data) {
  console.log("Not Available");
}

// Check if operation type and JSON file path are provided as command line arguments

if (process.argv.length < 4) {
  console.log("Essential parameters missing");
} else {
  const operationType = process.argv[2];
  const jsonFilePath = process.argv[3];

  if (operations.includes(operationType)) {
    // Check if JSON file exists

    fs.readFile(jsonFilePath, "utf8", (err, jsonData) => {
      const data = JSON.parse(jsonData);

      if (err) {
        console.log("JSON file doesn't exist on the given pathname");
      } else {
        try {
          if (operationType == "generate") {
            //MESSAGE

            console.log(
              `${color.magenta}GENERATING${color.white}`,
              data.config.name,
              color.cyan + data.path + color.white
            );
            divider();

            generate(data);
          } else if (operationType == "check") {
            //MESSAGE

            console.log(
              `${color.green}CHECKING${color.white}`,
              data.config.name,
              color.cyan + data.path + color.white
            );
            divider();
            check(data.path)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            //MESSAGE

            console.log(
              `${color.red}DELETING${color.white}`,
              data.config.name,
              color.cyan + data.path + color.white
            );
            divider();

            del(data.path);
          }
        } catch (err) {
          console.error(
            `Error parsing JSON data: ${color.red} ${err} ${color.white}`
          );
        }
      }
    });
  } else {
    console.log("Incorrect task type");
  }
}
