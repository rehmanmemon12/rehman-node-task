import { ApiError } from "@/interfaces/ApiError";
import Logger from "../loaders/logger";

/**
 * Request Validator
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const validate = (schema) => (req, res, next) => {

  let { value, error } = schema.validate(req.body);

  if (error) {

    let message = error.details.map(x=>x.message);
    let state = 400;

    Logger.error("Error Request Validation Failed: %o", message);

    return res.status(state).send(new ApiError(message));
  }

  next();
};

export default validate;
