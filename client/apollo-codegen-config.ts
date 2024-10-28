import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [`http://localhost:8080/v1/graphql`]: {},
  },
  documents: "./src/**/*.graphql",
  generates: {
    "src/shared/api/apollo-client/generated/hooks.ts": {
      preset: "import-types",
      presetConfig: {
        typesPath: "./graphql",
      },
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        enumsAsConst: true,
      },
      plugins: ["typescript-react-apollo"],
    },
    "src/shared/api/apollo-client/generated/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
    "src/shared/api/apollo-client/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: {
          unmaskFunctionName: "getFragmentData",
        },
      },
      config: {
        enumsAsConst: true,
        scalars: {
          uuid: "string",
          timestamp: "number",
        },
      },
    },
  },
  hooks: {
    afterAllFileWrite: [
      "prettier --write ./src/shared/api/apollo-client/generated/**/*",
    ],
  },
};

export default config;
