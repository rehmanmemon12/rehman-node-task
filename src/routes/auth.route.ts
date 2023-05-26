import { Router } from "express";
import validate from "@/middlewares/validator";
import authValidation from "@/validations/auth.validation";
import ctrl from "@/controllers";
import {auth} from "@/middlewares/authentication.middleware";
import {authorization} from "@/middlewares/authorization.middleware";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post("/register", validate(authValidation.register), ctrl.authController.register);

  route.post("/login", validate(authValidation.login), ctrl.authController.login);

    route.post("/reset-password", auth, authorization(["ADMIN", "USER"]), ctrl.authController.resetPassword);
};
