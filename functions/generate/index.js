const fs = require("fs");
const path = require("path");
//function
const { check } = require("../check");
//create
const { createTable } = require("./create/table");
const { createProfile } = require("./create/profile");
const { createForm } = require("./create/form");
const { createModule } = require("./create/module");
const { createApi } = require("./create/api");
const { createPage } = require("./create/page");

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

function divider() {
  console.log(color.white + `----------------------------------------`);
}

const checkParts = [
  { name: "Table", path: "components/private/Table" },
  { name: "Form", path: "components/private/Form" },
  { name: "Profile", path: "components/private/Profile" },
  { name: "Module", path: "modules" },
  { name: "Page", path: "pages" },
  { name: "API", path: "services" },
];

async function createFolders(url) {
  try {
    for (const component of checkParts) {
      const componentPath = component.path + url;
      if (!fs.existsSync(componentPath)) {
        fs.mkdirSync(componentPath, { recursive: true });
        console.log(`✨ Created folder: ${componentPath}`);
      }
    }
    divider();
    console.log(
      `All folders created successfully!${color.green} Re-run GENERATE${color.white}`
    );
  } catch (err) {
    console.error("Failed to create folders:", err);
  }
}

//GENERATE GROUPS

async function generateCreate(data) {
  createTable(data)
    .then((res) => {
      console.log("✅ Table Created");

      createForm(data)
        .then((res) => {
          console.log("✅ Form Created");

          createProfile(data)
            .then((res) => {
              console.log("✅ Profile Created");

              createApi(data)
                .then((res) => {
                  console.log("✅ Services Created");
                  console.log("---");
                  createModule(data)
                    .then((res) => {
                      console.log("✅ Module Created");
                      console.log("---");
                      createPage(data)
                        .then((res) => {
                          console.log("✅ Pages Created");
                          divider();

                          console.log(
                            "All Done! Save the following to " +
                              color.green +
                              "modules/index.tsx" +
                              color.white
                          );
                          divider();
                          console.log(
                            color.magenta +
                              `\nimport Module${data.config.key} from '@/modules${data.path}'`
                          );
                          console.log(
                            color.yellow +
                              `\n${data.config.name}: Module${data.config.key}\n`
                          );

                          divider();
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
}

async function generate(data) {
  check(data.path)
    .then((res) => {
      console.log(res);
      divider();
      console.log(color.green + "GENERATING FILES ...\n" + color.white);

      generateCreate(data);
    })
    .catch((err) => {
      console.log(err);
      divider();
      createFolders(data.path);
    });
}

module.exports = {
  generate,
};
