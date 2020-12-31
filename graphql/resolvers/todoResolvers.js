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
