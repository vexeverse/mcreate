const fs = require("fs");
const path = require("path");

const appDirectory = process.cwd();

async function createTable(data) {
  return new Promise(async (resolve, reject) => {
    const filePath = path.join(
      appDirectory,
      "components/private/Table",
      data.path,
      "index.tsx"
    );
    const filePathCol = path.join(
      appDirectory,
      "components/private/Table",
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
        import TableContainer from "@/components/container/Table";
        //react-query
        import { useQuery, useQueryClient } from "@tanstack/react-query";
        //columns
        import { columns } from "./columns";
        //apicalls
        import { getData } from "@/services${data.path}";
        //profile
        import ProfileComponent from '@/components/private/Profile${data.path}'

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
                api={getData}
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
          {
            accessor: "id",
            title: "#",
            render: (row: any, index: any) => <>{++index}</>,
          },     
         
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
