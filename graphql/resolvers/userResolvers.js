import { errorName } from "../../constants/errorCode";
import UserModel from "../../models/user";
import { createResponse } from "../../utils/response";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const getToken = ({ id, username, email }) =>
  jwt.sign(
    {
      id,
      username,
      email
    },
    process.env.JWT_SECRET,
    { expiresIn: "90m" }
  );

export default {
  Query: {
    users: async () => {
      const result = await UserModel.find({});
      return createResponse(result, true);
    },
    user: async (_, { id }) => {
      const result = await UserModel.findById(id);
      return createResponse(result, true);
    },
    login: async (
      _,
      { loginInput: { username, password } },
      __,
      { rootValue: { session } }
    ) => {
      if (!username || !password) throw new Error(errorName.LOGIN_INPUT_EMPTY);
      const user = await UserModel.findOne({
        username: username
      }).exec();
      console.log(username, user);
      if (!user) {
        throw new Error(errorName.LOGIN_FAILED);
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error(errorName.LOGIN_FAILED);
      const token = getToken(user);
      const tokenSplited = token.split(/\./);
      const signature = tokenSplited.splice(2, 1);
      session.xAuth = tokenSplited.join(".");
      session.yAuth = signature.join(".");
    },
    logout: async (_, __, context, { rootValue }) => {
      const { logOut, logout } = rootValue;
      typeof logOut === "function" && logOut();
      typeof logout === "function" && logout();
      context.auth = null;
      rootValue.session = null;
      return createResponse(null, true);
    }
  },
  Mutation: {
    register: async (
      _,
      { userInput: { username, password, email } },
      __,
      { rootValue: { session } }
    ) => {
      const checkIfExist = await UserModel.findOne({
        username,
        email
      }).exec();
      if (checkIfExist) {
        throw new Error(errorName.USER_ALREADY_EXISTS);
      }
      try {
        const _password = await bcrypt.hash(password, 10);
        const nextUser = new UserModel({
          password: _password,
          username,
          email
        });
        await nextUser.save();
        const token = getToken(nextUser);
        const tokenSplited = token.split(/\./);
        const signature = tokenSplited.splice(2, 1);
        session.xAuth = tokenSplited.join(".");
        session.yAuth = signature.join(".");
        return createResponse(nextUser, true);
      } catch (error) {
        console.log(error);
        return createResponse(error, false);
      }
    }
  }
};
