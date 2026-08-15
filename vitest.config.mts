import path from "node:path";
import { defineConfig } from "vitest/config";

const root = import.meta.dirname;

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(root, "src"),
      // `server-only` throws when imported outside a React Server Component.
      // Under test we are exercising the loaders directly, so stub it out.
      "server-only": path.resolve(root, "tests/stubs/empty.ts"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
