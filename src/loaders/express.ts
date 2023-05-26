import express from "express";
import cors from "cors";
import { OpticMiddleware } from "@useoptic/express-middleware";
import routes from "@/routes";
import config from "@/config";
import { ApiError } from "@/interfaces/ApiError";

export default ({ app }: { app: express.Application }) => {

  // Useful if you're behind a reverse proxy (Heroku)
  app.enable("trust proxy");

  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());


  // Transforms the raw string of req.body into json
  app.use(express.json());
  // Load API routes
  app.use(config.api.prefix, routes());


  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(new ApiError("No Found"));
  });

  /// error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res
        .status(err.status)
        .send(new ApiError(err.message))
        .end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json(new ApiError(err.messages));

  });
};
