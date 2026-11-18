import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  datasource: {
    url: process.env.DIRECT_URL || env("DATABASE_URL"),
  },
  migrations: {
    seed: "npx tsx prisma/seeds/seed.ts",
  },
});
