import jwt from "jsonwebtoken";
import config from "@/config";
import argon2 from "argon2";
import { randomBytes } from "crypto";
import {IUser, IUserInputDTO, resetPasswordDTO} from "@/interfaces/IUser";
import { ApiError } from "@/interfaces/ApiError";
import logger from "../loaders/logger";
import User from "../models/user";
import JwtService from "@/services/jwt.service";


export default class AuthService {
  constructor() {
  }


  public async register(userInputDTO: IUserInputDTO): Promise<{ user: IUser }> {
    try {
      let existingUser = await User.findOne({ where: { email: userInputDTO.email } });
      if (existingUser) {
        throw new ApiError(["Email already exist"]);
      }

      const salt = randomBytes(32);
      logger.silly("Hashing password");

      const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      logger.silly("Creating user db record");

      const userRecord = await User.create({
        ...userInputDTO,
        role: "USER", // only for User
        password: hashedPassword,
      });

      if (!userRecord) {
        throw new ApiError("User cannot be created");
      }


      const user = userRecord.toJSON() as IUser;
      Reflect.deleteProperty(user, "password");
      Reflect.deleteProperty(user, "salt");
      return { user };
    } catch (e) {
      logger.error(e);
      throw e;
    }
  }

  public async Login(email: string, password: string): Promise<{ name, authToken }> {
    const userRecord = await User.findOne({ where: { email: email } });
    if (!userRecord) {
      throw new ApiError("User is not registered");
    }

    /**
     * verifying from argon2 to prevent 'timing based' attacks
     */
    logger.silly("Checking password");
    const validPassword = await argon2.verify(userRecord.password, password);
    if (validPassword) {
      logger.silly("Password is valid!");

      let name = userRecord.name;
      const authToken = JwtService.generateToken({ userId: userRecord.id, userRole: userRecord.role == 'ADMIN' ? 1 : 2 });


      return { name, authToken };
    } else {
      throw new ApiError("Invalid Password or Username");
    }
  }

  public async resetPassword(id: string, data: resetPasswordDTO): Promise<{name}> {
    let userRecord = await User.findOne({ where: { id: id } });
    if (!userRecord) {
        throw new ApiError("User is not registered");
    }

    const salt = randomBytes(32);
    logger.silly("Hashing password");
    const hashedPassword = await argon2.hash(data.newPassword, { salt });
    logger.silly("Updating user db record");
    let userRecordUpdated = await User.update({
        password: hashedPassword,
    }, { where: { id: id } });
    if (!userRecordUpdated) {
        throw new ApiError("User cannot be updated");
    }
    return {name: userRecord.name};
  }

}
