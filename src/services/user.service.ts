import {IUserUpdateInputDTO} from "@/interfaces/IUser";
import {ApiError} from "@/interfaces/ApiError";
import logger from "../loaders/logger";
import User from "../models/user";


export default class UserService {
    constructor() {
    }

    public async getAll(): Promise<any> {
        try {
            let users = await User.findAll({where: {role: "USER"}});
            if (users) {
                users = users.map((user: any) => {
                        let data = user.get({plain: true});
                        delete data.password;
                        delete data.roleId;
                        return data;
                });
                return users;
            }else{
                throw new ApiError("User not Found");
            }
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    public async getById(request: any): Promise<any> {
        try {
            const user = await User.findByPk(request);
            if (user) {
                let data = user.get({plain: true});
                delete data.password;
                delete data.roleId;
                return data;
            } else {
                throw new ApiError("User not Found");
            }
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    public async update(IUserUpdateInputDTO: IUserUpdateInputDTO): Promise<boolean> {
        try {
            let sameUser = await User.findOne({where: {email: IUserUpdateInputDTO.email, id: IUserUpdateInputDTO.id}});
            let userRecord;
            if (sameUser) {
                userRecord = await User.update({
                    ...IUserUpdateInputDTO,
                }, {where: {id: IUserUpdateInputDTO.id}});
                if (userRecord)
                return true;
            } else {
                let existingUser = await User.findOne({
                    where: {
                        email: IUserUpdateInputDTO.email
                    }
                });
                if (!existingUser) {
                    userRecord = await User.update({
                        ...IUserUpdateInputDTO,
                    }, {where: {id: IUserUpdateInputDTO.id}});
                    if (userRecord){
                        return true;
                    }
                } else {
                    throw new ApiError("User already used.");
                }
            }
        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

    public async deleteUser(id: string): Promise<boolean> {
        try {
            let users = await User.findByPk(id);
            let userData = users.get({plain: true});
            if (userData) {
                await User.destroy({where: {id: userData.id}});
                return true;
            } else {
                throw new ApiError("User not Found");
            }

        } catch (e) {
            logger.error(e);
            throw e;
        }
    }

}
