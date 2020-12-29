let data = [
  { _id: 1, job: "graphql", isDone: false },
  { _id: 2, job: "expressjs", isDone: true }
];

function fakeAwait(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

export default {
  todos: async () => {
    const result = await fakeAwait(data);
    return result;
  },
  todo: async ({ id }) => {
    const result = await fakeAwait(data.find(f => f._id == id));
    return result;
  },
  createTodo: async ({ todoInput }) => {
    const nextTodo = {
      _id: data.length + 1,
      ...todoInput
    };
    data = [...data, nextTodo];
    return await fakeAwait(nextTodo);
  }
};
