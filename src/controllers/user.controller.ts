import {NextFunction, Request, Response} from "express";
import {ApiResponse} from "@/interfaces/ApiResponse";
import logger from "../loaders/logger";
import UserService from "@/services/user.service";
import {AuthenticatedRequest} from "@/interfaces/AuthenticatedRequest";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug("Calling Sign-In endpoint with body: %o");
    try {
        let userService = new UserService();
        const users = await userService.getAll();

        return res.json(new ApiResponse("Login Successfully", {users}))
            .status(200);
    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
}

const getById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        let userService = new UserService();
        if (req.role !== "ADMIN" && req.params.id) {
            req.params.id = req.currentUser as any;
        }
        if (req.role === "ADMIN" && req.params.id) {
            req.params.id = req.params.id;
        }
        const user = await userService.getById(req.params.id);

        return res.json(new ApiResponse("Get User Details Successfully", {user}))
            .status(200);
    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
}


const update = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {

        let userService = new UserService();

        if (req.role !== "ADMIN" && req.body.id) {
            req.body.id = req.currentUser;
        }
        if (req.role === "ADMIN" && req.body.id) {
            req.body.id = req.body.id;
        }
        let user = await userService.update(req.body);

        return res.json(new ApiResponse("Updated Successfully", user))
            .status(200);
    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug("Calling User Delete endpoint with body: %o", req.params.id);
    try {
        let userService = new UserService();
        const users = await userService.deleteUser(req.params.id);

        return res.json(new ApiResponse("Get User Details Successfully", {users}))
            .status(200);
    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
}


export default {
    getById,
    update,
    deleteUser,
    getAll,
}
