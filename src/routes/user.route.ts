import {Router} from "express";
import validate from "@/middlewares/validator";

import ctrl from "@/controllers";
import userValidation from "@/validations/user.validation";
import {auth} from "@/middlewares/authentication.middleware";
import {authorization} from "@/middlewares/authorization.middleware";

const route = Router();

export default (app: Router) => {
    app.use("/users", route);

    route.get("/", auth,  authorization(["ADMIN"]), ctrl.userController.getAll);

    route.get("/:id", auth, authorization(["ADMIN", "USER"]) ,ctrl.userController.getById);

    route.delete("/:id", auth, authorization(["ADMIN"]), ctrl.userController.deleteUser);

    route.put("/", auth, authorization(["ADMIN", "USER"]), validate(userValidation.update), ctrl.userController.update);


};
