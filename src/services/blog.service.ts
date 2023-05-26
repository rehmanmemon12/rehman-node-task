import {ApiError} from "@/interfaces/ApiError";
import logger from "../loaders/logger";
import Posts from "@/models/posts";
import User from "@/models/user";

export default class BlogService {
    constructor() {
    }

    public async createPost(postInputDTO: any): Promise<any> {
        logger.silly("Creating user db record");

        let postRecord = await Posts.create({
            ...postInputDTO,
        });

        if (!postRecord) {
            throw new ApiError("Post cannot be created");
        }

        const post = postRecord.toJSON();
        return post;
    }

    public async getAllPosts(request: any): Promise<any> {
        let posts = await Posts.findAll({
            where: {
                userId: request,
            },
        })
        if (posts) {
            posts = posts.map((post: any) => {
                let data = post.get({plain: true});
                return data;
            });
            return posts;
        }

    }

    public async getPostById(postId: string): Promise<any> {
        const post = await Posts.findByPk(postId);
        if (post) {
            let data = post.get({plain: true});
            return data;
        } else {
            throw new ApiError("Post not Found");
        }
    }

    public async updatePost(postInputDTO: any): Promise<boolean> {
        logger.silly("Update user db record");

        let existingUserId = await User.findOne({where: {id: postInputDTO.userId}});
        if (!existingUserId) {
            throw new ApiError("User not found");
        }

        const updatedPost = await Posts.update({
            ...postInputDTO,
        }, {where: {id: postInputDTO.id}});
        if (updatedPost) {
            return true;
        } else {
            throw new ApiError("Post not Found");
        }
    }

    public async deletePost(postId: string): Promise<any> {
        logger.silly("Delete Post db record");

        const deletedPost = await Posts.destroy({where: {id: postId}});
        if (deletedPost) {
            return true;
        } else {
            throw new ApiError("Post not Found");
        }
    }

    public async getAllPostByUser(user: string): Promise<any> {

        const posts = await Posts.findAll({where: {userId: user}});
        if (posts) {
            let data = posts.map((post: any) => {
                return post.get({plain: true});
            });
            return data;
        } else {
            throw new ApiError("Post not Found");
        }
    }
}
