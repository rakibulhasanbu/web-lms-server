import { Response } from "express";
import userModel from "../models/user.model";

//get user by id
export const getUserById = (id: string, res: Response) => {
  const user = userModel.findById(id);

  return res.status(200).json({
    message: true,
    user,
  });
};
