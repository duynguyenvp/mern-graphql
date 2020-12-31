import { errorName } from "../../constants/errorCode";
import UserModel from "../../models/user";
import { createResponse } from "../../utils/response";

export default {
  Query: {
    users: async () => {
      const result = await UserModel.find({});
      return createResponse(result, true);
    },
    user: async (_, { id }) => {
      const result = await UserModel.findById(id);
      return createResponse(result, true);
    }
  },
  Mutation: {
    createUser: async (_, { userInput }) => {
      const checkIfExist = await UserModel.findOne({
        name: userInput.name,
        age: userInput.age
      }).exec();
      if (checkIfExist) {
        throw new Error(errorName.USER_ALREADY_EXISTS);
      }
      try {
        const nextUser = new UserModel(userInput);
        await nextUser.save();
        return createResponse(nextUser, true);
      } catch (error) {
        return createResponse(error, false);
      }
    }
  }
};
