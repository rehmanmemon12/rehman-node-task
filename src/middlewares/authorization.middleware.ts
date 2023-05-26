import {Request, Response, NextFunction} from 'express';
import {ApiError} from "@/interfaces/ApiError";
import User from "@/models/user";
import {AuthenticatedRequest} from "@/interfaces/AuthenticatedRequest";


export const authorization = (roles: string[]) => async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const userId = req.currentUser;
        const user = await User.findOne({where: {id: userId}});
        if (!user) {
            res.status(401).json({error: 'Unauthorized'});
            return;
        }
        if (roles.includes(user?.role)) {
            req.role = user?.role;
            next();
        } else {
            res.status(401).json({error: 'Sorry, You do not have access'});
        }
    } catch (err) {
        res.status(401).send({message: 'UnAuthorized Access Token'});
    }
};
