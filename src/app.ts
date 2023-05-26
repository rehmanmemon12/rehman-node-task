import "reflect-metadata"; // We need this in order to use @Decorators
import config from "./config";

import express from "express";

import Logger from "./loaders/logger";
import loader from "@/loaders";

async function startServer() {
  const app = express();

  // await require("./loaders").default({ expressApp: app });
  await loader({ expressApp: app });

  app
    .listen(config.port, () => {
      Logger.info(`
      ################################################
      🛡  Server listening on port: ${config.port} 🛡
      ################################################
    `);
    })
    .on("error", err => {
      Logger.error(err);
      process.exit(1);
    });

  return app;
}

const expressApp = startServer();
export default expressApp;