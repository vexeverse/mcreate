const fs = require("fs");
const path = require("path");

const appDirectory = process.cwd();

async function createProfile(data) {
  return new Promise(async (resolve, reject) => {
    const filePath = path.join(
      appDirectory,
      "components/private/profile",
      data.path,
      "index.tsx"
    );

    try {
      fs.writeFileSync(
        filePath,
        `        
        export default function () {
            return <>
              This is a demo test profile component
            </>;
          }
          
    `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createProfile,
};
