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

  type TodoMutation {
    createTodo(todoInput: TodoInput): Todo
  }

  schema {
    query: TodoQuery
    mutation: TodoMutation
  }
`);
