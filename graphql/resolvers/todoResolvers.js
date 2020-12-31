import { errorName } from "../../constants/errorCode";
import TodoModel from "../../models/todo";
import { createResponse } from "../../utils/response";

export default {
  Query: {
    todos: async () => {
      const result = await TodoModel.find({});
      return createResponse(result, true);
    },
    todo: async (_, { id }) => {
      const result = await TodoModel.findById(id);
      return createResponse(result, true);
    }
  },
  Mutation: {
    createTodo: async (_, { todoInput }) => {
      const checkIfExist = await UserModel.findOne({
        job: todoInput.job
      }).exec();
      if (checkIfExist) {
        throw new Error(errorName.JOB_ALREADY_EXISTS);
      }
      try {
        const nextTodo = new TodoModel(todoInput);
        await nextTodo.save();
        return createResponse(nextTodo, true);
      } catch (error) {
        return createResponse(error, false);
      }
    }
  }
};
