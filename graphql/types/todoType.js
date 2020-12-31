export default `
  type Todo {
    _id: ID!
    job: String!
    isDone: Boolean!
  }

  input TodoInput {
    job: String!
    isDone: Boolean!
  }

  type TodoResponse {
    success: Boolean!
    message: String
    data: [Todo]
  }

  type Query {
    todos: TodoResponse
    todo(id: ID!): TodoResponse
  }

  type Mutation {
    createTodo(todoInput: TodoInput): TodoResponse
  }`;
