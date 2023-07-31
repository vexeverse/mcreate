const fs = require("fs");
const path = require("path");

const appDirectory = process.cwd();

async function createList(data, modulePath) {
  const filePath = path.join(appDirectory, "pages", data.path, "index.tsx");

  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFileSync(
        filePath,
        `        
        //Module
        import Module from "@/modules";
        //Container
        import { LayoutAdmin } from "@/components/layouts";
        
        export default function Page() {
          return (
            <>
              <Module.${modulePath}.List />
            </>
          );
        }
        
        Page.Layout = LayoutAdmin;        

    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

async function createNew(data, modulePath) {
  const filePath = path.join(appDirectory, "pages", data.path, "new.tsx");

  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFileSync(
        filePath,
        `        
        //Module
        import Module from "@/modules";
        //Container
        import { LayoutAdmin } from "@/components/layouts";
        
        export default function Page() {
          return (
            <>
              <Module.${modulePath}.New />
            </>
          );
        }
        
        Page.Layout = LayoutAdmin;      
        

    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

async function createEdit(data, modulePath) {
  const filePath = path.join(appDirectory, "pages", data.path, "[id].tsx");

  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFileSync(
        filePath,
        `        
        //Module
        import Module from "@/modules";
        //Container
        import { LayoutAdmin } from "@/components/layouts";
        
        export default function Page() {
          return (
            <>
              <Module.${modulePath}.Edit />
            </>
          );
        }
        
        Page.Layout = LayoutAdmin;    
    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

async function createView(data, modulePath) {
  const filePath = path.join(
    appDirectory,
    "pages",
    data.path,
    "profile/",
    "[id].tsx"
  );

  return new Promise(async (resolve, reject) => {
    try {
      fs.writeFileSync(
        filePath,
        `        
        //Module
        import Module from "@/modules";
        //Container
        import { LayoutAdmin } from "@/components/layouts";
        
        export default function Page() {
          return (
            <>
              <Module.${modulePath}.View />
            </>
          );
        }
        
        Page.Layout = LayoutAdmin;    

    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

async function createPage(data) {
  return new Promise(async (resolve, reject) => {
    const directoryPath = path.join(appDirectory, "pages", data.path);
    const modulePath = `${data.module[0]}${
      data.module[1] ? "." + data.module[1] : ""
    }${data.module[2] ? "." + data.module[2] : ""}`;

    console.log(modulePath);

    console.log("🟢 Generating Pages");

    try {
      fs.mkdirSync(directoryPath + "/profile");
    } catch (err) {}

    console.log("├ Folders Added ");

    try {
      createList(data, modulePath)
        .then((res) => {
          console.log("├ List Added ");
          createNew(data, modulePath)
            .then((res) => {
              console.log("├ New Added ");
              createEdit(data, modulePath)
                .then((res) => {
                  console.log("├ Edit Added ");
                  createView(data, modulePath)
                    .then((res) => {
                      console.log("├ View Added ");

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
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createPage,
};
