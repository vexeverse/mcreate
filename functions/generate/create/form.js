const fs = require("fs");
const path = require("path");

const appDirectory = process.cwd();

async function createForm(data) {
  return new Promise(async (resolve, reject) => {
    const filePath = path.join(
      appDirectory,
      "components/private/form",
      data.path,
      "index.tsx"
    );

    try {
      fs.writeFileSync(
        filePath,
        `        
        import React, { useState, useContext } from "react";
        //nextjs
        import { useRouter } from "next/router";
        //mantine
        import {
          Alert,
          Badge,
          Grid,
          Group,
          NumberInput,
          PasswordInput,
          SegmentedControl,
          Select,
          Text,
          TextInput,
          Textarea,
          useMantineTheme,
        } from "@mantine/core";
        //icons
        import { Warning } from "phosphor-react";
        //context
        import { useFormContext } from "@context/components/FormWrapper";
        import { FormContext } from "@container/form/General";        
        //UI
        import FormHeader from "@ui/Form/FormHeader";    
        
        export default function() {
          //definition
          const Router = useRouter();
          const theme = useMantineTheme();
        
          //form
          const form = useFormContext();
        
          //context
          const { state, dispatch } = useContext(FormContext);
          const { loading, current, defaultInputProps } = state;
        
          switch (current) {
            case 0:
              return (
                <>
                  <Grid>
                    <FormHeader
                      top
                      step="1.1"
                      title="General Information"
                      desc="General information on this new NAS."
                    />
                    <Grid.Col xs={12} lg={6}>
                      <TextInput
                        {...defaultInputProps}
                        required
                        placeholder="e.g. RAD-AREA"
                        label="NAS Name"
                        {...form.getInputProps("shortname")}
                      />
                    </Grid.Col>    
                  </Grid>
                </>
              );
        
            default:
              return <>?</>;
          }
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
  createForm,
};
