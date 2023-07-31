const fs = require("fs");
const path = require("path");

const appDirectory = process.cwd();

async function createConfig(data) {


  return new Promise(async (resolve, reject) => {
    const filePath = path.join(
      appDirectory,
      "components/private/table",
      data.path,
      "index.tsx"
    );

    try {
      fs.writeFileSync(
        filePath,
        `        
       
    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createConfig,
};
