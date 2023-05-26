import {Router} from "express";
import validate from "@/middlewares/validator";

import ctrl from "@/controllers";
import blogValidation from "@/validations/blog.validation";
import {authorization} from "@/middlewares/authorization.middleware";
import {auth} from "@/middlewares/authentication.middleware";

const route = Router();

export default (app: Router) => {
    app.use("/posts", route);

    route.post("/", auth, authorization(["ADMIN", "USER"]), validate(blogValidation.create), ctrl.blogController.createPost);

    route.get("/", auth, authorization(["ADMIN", "USER"]), ctrl.blogController.getAllPosts);

    route.get("/:id", auth, authorization(["USER"]),  ctrl.blogController.getPostById);

    route.put("/", auth, authorization(["ADMIN", "USER"]), validate(blogValidation.update), ctrl.blogController.updatePost);

    route.delete("/:id", auth, authorization(["ADMIN", "USER"]), ctrl.blogController.deletePost);


};
