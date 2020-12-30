import TodoModel from "../../models/todo";

export default {
  todos: async () => {
    const result = await TodoModel.find({});
    return result;
  },
  todo: async ({ id }) => {
    const result = await TodoModel.findById(id);
    return result;
  },
  createTodo: async ({ todoInput }) => {
    const nextTodo = new TodoModel(todoInput);
    try {
      throw Error("testttttt");
      await nextTodo.save();
      return {
        success: true,
        data: nextTodo
      };
    } catch (error) {
      return {
        success: false,
        message: error
      };
    }
  }
};
