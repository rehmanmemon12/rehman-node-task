import {NextFunction, Request, Response} from "express";
import AuthService from "../services/auth.service";
import {ApiResponse} from "@/interfaces/ApiResponse";
import logger from "../loaders/logger";
import {IUserInputDTO, resetPasswordDTO} from "@/interfaces/IUser";
import jwt from "jsonwebtoken";


const login = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug("Calling Sign-In endpoint with body: %o", req.body);

    try {
        const {email, password} = req.body;
        let auth = new AuthService();
        const {name, authToken} = await auth.Login(email, password);

        return res.json(new ApiResponse("Login Successfully", {name, authToken}))
            .status(200);
    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
};


const register = async (req: Request, res: Response, next: NextFunction) => {

    logger.debug("Calling Register endpoint with body: %o", req.body);
    try {
        let auth = new AuthService();
        const user = await auth.register(req.body as IUserInputDTO);
        return res.status(201).json(new ApiResponse("Register Successfully", true));
    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
};

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body as resetPasswordDTO;
        const token = req.headers.authorization?.split(" ")[1];
        const decodedToken = jwt.verify(token as string, process.env.JWT_SECRET as string);
        const userId = (decodedToken as any).userId;
        if (!userId) {
            return res.json(new ApiResponse("User Id not found", false));
        }
        let auth = new AuthService();
        const user = await auth.resetPassword(userId, data);
        return res.status(201).json(new ApiResponse("Password Reset Successfully", true));
    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
}


export default {
    login,
    register,
    resetPassword
};
