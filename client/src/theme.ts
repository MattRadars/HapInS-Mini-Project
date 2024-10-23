import { createSystem, defineConfig } from "@chakra-ui/react";
// import { textStyles } from "./textStyles";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        heading: { value: `system-ui', sans-serif` },
        body: { value: `'system-ui', sans-serif` },
      },
      colors: {
        primary: { value: "#fef2f3" },
        secondary: { value: "#13111" },
      },
    },
  },
});

export const customTheme = createSystem(config);
