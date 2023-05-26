import {NextFunction, Request, Response} from "express";
import logger from "@/loaders/logger";
import {ApiResponse} from "@/interfaces/ApiResponse";
import BlogService from "@/services/blog.service";
import {AuthenticatedRequest} from "@/interfaces/AuthenticatedRequest";


const createPost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    logger.debug("Calling User Create Post endpoint with body: %o", req.body);
    try {
        let blogService = new BlogService();
        if (req.role !== "ADMIN") {
            req.body.userId = req.currentUser;
        }
        const post = await blogService.createPost(req.body);
        return res.json(new ApiResponse("Create Post Details Successfully", {post}))
            .status(200);
    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
}

const updatePost = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    logger.debug("Calling User Update Post endpoint with body: %o", req.body);
    try {
        let blogService = new BlogService();
        if (req.role !== "ADMIN") {
            req.body.userId = req.currentUser;
        }
        if (!req.body.userId){
            return res.json(new ApiResponse("You need to add User Id update against post", false));
        }
        const post = await blogService.updatePost(req.body);
        return res.json(new ApiResponse("Update Post Details Successfully", {post}))

    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
}

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug("Calling User Delete Post endpoint with body: %o");
    try {
        const blogService = new BlogService();
        const post = await blogService.deletePost(req.params.id);
        return res.json(new ApiResponse("Post Delete Successfully", {post}))

    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
}

const getAllPosts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const blogService = new BlogService();
        if (req.role !== "ADMIN") {
            req.body.userId = req.currentUser;
        }
        else if(req.role === "ADMIN" && req.body.userId){
            req.body.userId = req.body.userId;
        }
        const posts = await blogService.getAllPosts(req.body.userId);
        return res.json(new ApiResponse("Get All Post Details Successfully", {posts}))
    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
}

const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    logger.debug("Calling User Get Post By Id endpoint with body: %o", req.body);
    try {
        const blogService = new BlogService();
        const post = await blogService.getPostById(req.params.id);
        return res.json(new ApiResponse("Get Post By Id Details Successfully", {post}))

    } catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
}

const getAllPostByUserId = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    logger.debug("Calling User Get All Post By User Id endpoint with body: %o");
    try {
        const blogService = new BlogService();
        if (req.role !== "ADMIN") {
            req.body.userId = req.currentUser;
        }
        const posts = await blogService.getAllPostByUser(req.body.userId);
        return res.json(new ApiResponse("Get All Post By User Id Details Successfully", {posts}))

    }
    catch (e) {
        logger.error("error: %o", e);
        return next(e);
    }
}

export default {
    createPost,
    updatePost,
    deletePost,
    getAllPosts,
    getPostById,
    getAllPostByUserId,
}
