const fs = require("fs");
const path = require("path");

const appDirectory = process.cwd();

async function createList(data) {
  const filePath = path.join(
    appDirectory,
    "modules",
    data.path,
    "list/",
    "index.tsx"
  );

  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFileSync(
        filePath,
        `        
        import TableComponent from "@/components/private/Table${data.path}";
        import moduleInfo from "../module.info";

        export default function () {
          return (
            <>
              <TableComponent moduleInfo={moduleInfo} />
            </>
          );
        }

    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

async function createNew(data) {
  const filePath = path.join(
    appDirectory,
    "modules",
    data.path,
    "new/",
    "index.tsx"
  );

  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFileSync(
        filePath,
        `        
        //mantine
        import { Text } from "@mantine/core";
        //zod
        import { z } from "zod";
        //components
        import FormContainer from "@/components/container/Form/General";
        import Breadcrumbs from "@/components/shared/Navigation/Breadcrumb";
        import FormComponent from "@/components/private/Form${data.path}";
        //info
        import moduleInfo from "../module.info";
        //api
        import api from "@/services${data.path}";
        
        export default function () {
          const validate = [
            z.object({}),
          ];
        
          return (
            <FormContainer
              title={moduleInfo.name}
              breadcrumb={
                <Breadcrumbs>
                  <Text size="xs" color="dimmed">
                    Home
                  </Text>
                  {moduleInfo.bread.map((e: any, index: any) => (
                    <Text size="xs" color={"dimmed"} key={index}>
                      {e}
                    </Text>
                  ))}
                  <Text size="xs" color="brand">
                    New
                  </Text>
                </Breadcrumbs>
              }
              initial={{
                type: "branch",
              }}
              validate={validate}
              api={api.createData}
              transformOnSubmit={[]}
            >
              <FormComponent />
            </FormContainer>
          );
        }
        

    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

async function createEdit(data) {
  const filePath = path.join(
    appDirectory,
    "modules",
    data.path,
    "edit/",
    "index.tsx"
  );

  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFileSync(
        filePath,
        `        
        //mantine
        import { Text } from "@mantine/core";
        //zod
        import { z } from "zod";
        //components
        import FormContainer from "@/components/container/Form/General";
        import Breadcrumbs from "@/components/shared/Navigation/Breadcrumb";
        import FormComponent from "@/components/private/Form${data.path}";
        //info
        import moduleInfo from "../module.info";
        //api
        import api from "@/services${data.path}";

        export default function () {
          const validate = [z.object({}), z.object({}), z.object({}), z.object({})];

          return (
            <FormContainer
              editType
              title={moduleInfo.name}
              breadcrumb={
                <Breadcrumbs>
                  <Text size="xs" color="dimmed">
                    Home
                  </Text>
                  {moduleInfo.bread.map((e: any, index: any) => (
                    <Text size="xs" color={"dimmed"} key={index}>
                      {e}
                    </Text>
                  ))}
                  <Text size="xs" color="brand">
                    New
                  </Text>
                </Breadcrumbs>
              }
              initial={{
                type: "branch",
              }}
              validate={validate}
              api={api.editData}
              get={api.getSingleData}
              transformOnSubmit={[]}
            >
              <FormComponent />
            </FormContainer>
          );
        }
    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

async function createView(data) {
  const filePath = path.join(
    appDirectory,
    "modules",
    data.path,
    "view/",
    "index.tsx"
  );

  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFileSync(
        filePath,
        `        
        export default function () {
          return <>Module View</>;
        }        

    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

async function createConfig(data) {
  const filePath = path.join(
    appDirectory,
    "modules",
    data.path,
    "module.info.ts"
  );

  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFileSync(
        filePath,
        `        
        import { Text } from "@mantine/core";
  
        const info = {
          name: "${data.config.label}",
          bread: ${data.config.bread},
          query: ${data.config.query},
          key: "${data.config.key}",
        };
      
        export default info; 

    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

async function createMain(data) {
  const filePath = path.join(appDirectory, "modules", data.path, "index.tsx");

  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFileSync(
        filePath,
        `        
        import List from "./list";
        import New from "./new";
        import Edit from "./edit";
        import View from "./view";
        
        export default { List, New, Edit, View };  

    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

async function createModule(data) {
  return new Promise(async (resolve, reject) => {
    const directoryPath = path.join(appDirectory, "modules", data.path);

    console.log("🔵 Generating Modules");

    try {
      fs.mkdirSync(directoryPath + "/list");
      fs.mkdirSync(directoryPath + "/view");
      fs.mkdirSync(directoryPath + "/new");
      fs.mkdirSync(directoryPath + "/edit");
    } catch (err) {}

    console.log("├ Folders Added ");

    try {
      createList(data)
        .then((res) => {
          console.log("├ List Added ");
          createNew(data)
            .then((res) => {
              console.log("├ New Added ");
              createEdit(data)
                .then((res) => {
                  console.log("├ Edit Added ");
                  createView(data)
                    .then((res) => {
                      console.log("├ View Added ");

                      createConfig(data)
                        .then((res) => {
                          console.log("├ Config Added ");

                          createMain(data)
                            .then((res) => {
                              console.log("├ Main Added ");

                              resolve();
                            })
                            .catch((err) => {
                              console.log(err);
                              reject();
                            });
                        })
                        .catch((err) => {
                          console.log(err);
                          reject();
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                      reject();
                    });
                })
                .catch((err) => {
                  console.log(err);
                  reject();
                });
            })
            .catch((err) => {
              console.log(err);
              reject();
            });
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createModule,
};
