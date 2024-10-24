import { CodegenConfig } from "@graphql-codegen/cli";

// const schemaUrl = import.meta.env.VITE_SCHEMA_URL;

const config: CodegenConfig = {
  schema: "http://localhost:8080/v1/graphql",
  documents: ["**/*.{ts,tsx}"],
  generates: {
    "./src/shared/api/apollo-client/Graphql": {
      preset: "client",
    },
  },
};

export default config;
