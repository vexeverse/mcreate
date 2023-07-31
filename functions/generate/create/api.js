const fs = require("fs");
const path = require("path");

const appDirectory = process.cwd();

async function createApi(data) {
  return new Promise(async (resolve, reject) => {
    const filePath = path.join(appDirectory, "services", data.path, "index.ts");

    try {
      fs.writeFileSync(
        filePath,
        `        
        import { getApi, formApi, getApiSingle } from "@/services/axios";
        import apiLink from "@/json/api";
        import { dummyData } from "@/json/dummydata";

        const apilink = apiLink.orm.inventory.category;
        
        async function getData() {
          return getApi({
            url: apilink,
          });
        }
        
        async function getSingleData(id: any) {
          return getApiSingle({
            url: apilink,
            id: id,
          });
        }
        
        async function createData(body: any) {
          return formApi({
            url: apilink,
            body: body,
          });
        }
        
        async function editData(body: any) {
          return formApi({
            url: apilink,
            body: body,
          });
        }
        
        export { getData, createData, editData, getSingleData };        
        
    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createApi,
};
