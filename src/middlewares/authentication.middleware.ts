import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {ApiError} from "@/interfaces/ApiError";
import User from "@/models/user";
import {AuthenticatedRequest} from "@/interfaces/AuthenticatedRequest";

export const SECRET_KEY: Secret = 'your-secret-key';

export const auth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new ApiError('UnAuthorized Access Token');
        }

        const decoded = jwt.verify(token, SECRET_KEY);

        const userId: number = decoded.userId;

        // Find the user by userId in the database
        const user = await User.findByPk(userId);
        if (!user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        req.currentUser = userId;

        next();
    } catch (err) {
        res.status(401).send({message: 'UnAuthorized Access Token'});
    }
};
