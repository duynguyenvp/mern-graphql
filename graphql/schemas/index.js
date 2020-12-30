import { buildSchema } from "graphql";

export default buildSchema(`
  type Todo {
    _id: ID!
    job: String!
    isDone: Boolean!
  }

  input TodoInput {
    job: String!
    isDone: Boolean!
  }

  type TodoQuery {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }
  
  type Response {
    success: Boolean!
    message: String
    data: String
  }

  type TodoMutation {
    createTodo(todoInput: TodoInput): Response
  }

  schema {
    query: TodoQuery
    mutation: TodoMutation
  }
`);
