const fs = require("fs");
const path = require("path");

const appDirectory = process.cwd();

async function createTable(data) {
  return new Promise(async (resolve, reject) => {
    const filePath = path.join(
      appDirectory,
      "components/private/table",
      data.path,
      "index.tsx"
    );
    const filePathCol = path.join(
      appDirectory,
      "components/private/table",
      data.path,
      "columns.tsx"
    );

    try {
      fs.writeFileSync(
        filePath,
        `        
        import { useEffect, useState } from "react";
        //mantine
        import { Group, Tabs, Text, useMantineTheme } from "@mantine/core";
        //voidui
        import Breadcrumbs from "@/components/shared/Navigation/Breadcrumb";
        //container
        import TableContainer from "@container/table";
         //react-query
        import { useQuery, useQueryClient } from "@tanstack/react-query";
        //columns
        import { columns } from "./columns";
        //apicalls
        import api from "@/services/config/permission";
        //profile
        import ProfileComponent from '@profile${data.path}'

        //STATIC

        export default function ({ moduleInfo }: { moduleInfo: any }) {
          //definitions
          const theme = useMantineTheme();
          //tabs
          const [tab, setTabs] = useState("0");

          //Preloading

          return (
            <>
              <TableContainer
                server={false}
                //data
                query={moduleInfo.query}
                api={api.getData}
                columns={columns}
                //tabs

                tabValue={tab}
                onTabChange={setTabs}
                //filter
                filter={[]}
                //pagination

                //state
                disableAdd={false}
                enableProfile
                modalProfile
                ProfileComponent={<ProfileComponent/>}
                //profiling

                //content
                title={moduleInfo.name}
                breadcrumb={
                  <Breadcrumbs>
                    <Text size="xs" color="dimmed">
                      Home
                    </Text>
                    {moduleInfo.bread.map((e: any, index: any) => (
                      <Text
                        size="xs"
                        color={
                          index == moduleInfo.bread.length - 1 ? "brand" : "dimmed"
                        }
                        key={index}
                      >
                        {e}
                      </Text>
                    ))}
                  </Breadcrumbs>
                }
              />
            </>
          );
        }
    `
      );

      fs.writeFileSync(
        filePathCol,
        `
        import { ActionIcon, Badge, Button, Group, Menu, Text } from "@mantine/core";
    
        export const columns = [
         
        ];
        
        `
      );
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  createTable,
};
