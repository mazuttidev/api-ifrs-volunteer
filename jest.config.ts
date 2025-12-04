import type { Config } from "jest";

const config: Config = {
  testEnvironment: "node",

  // Aumenta timeout global – importante para E2E
  testTimeout: 30000,

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleFileExtensions: ["ts", "js", "json"],

  moduleDirectories: ["node_modules", "src"],

  // 🔥 Permite testes fora de src (ex: tests/e2e/*.test.ts)
  roots: ["<rootDir>/tests", "<rootDir>/src"],

  // Selenium usa CommonJS → precisa disso
  extensionsToTreatAsEsm: [],
};

export default config;
