import expressLoader from "./express";
import sequelize from "./sequilize";
import Logger from "./logger";


const loader = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  Logger.info("Express loaded");

  await sequelize.sync( {force: false});
  Logger.info("DB loaded and connected!");
};

export default loader;