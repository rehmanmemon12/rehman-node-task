import { Sequelize, Options, Dialect } from 'sequelize';
import winston from 'winston';
import dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config();

// Initialize a logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
});

const sequelizeOptions: Options = {
    dialect: 'postgres' as Dialect,
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'user-accounts',
};

const sequelize = new Sequelize(sequelizeOptions);

// Test the database connection and log the result
sequelize
    .authenticate()
    .then(() => {
        logger.info('Connected to the database');
    })
    .catch((error) => {
        logger.error('Unable to connect to the database:', error);
    });

export default sequelize;
