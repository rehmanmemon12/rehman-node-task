import {Request} from "express";

export interface AuthenticatedRequest extends Request{
    currentUser?: number;
    role?: string;
}
