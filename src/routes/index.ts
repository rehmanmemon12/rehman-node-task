import {Router} from "express";
import auth from "./auth.route";
import user from "./user.route";
import posts from "./blog.routes";

// guaranteed to get dependencies
export default () => {
    const app = Router();
    auth(app);
    user(app);
    posts(app);


    return app;
}
