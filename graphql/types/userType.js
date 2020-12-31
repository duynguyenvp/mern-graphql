export default `
  type User {
    _id: ID!
    name: String!
    age: Int
    isDeleted: Boolean!
  }

  input UserInput {
    name: String!
    age: Int
    isDeleted: Boolean!
  }

  type UserResponse {
    success: Boolean!
    message: String
    data: [User]
  }

  type Query {
    users: UserResponse
    user(id: ID): UserResponse
  }

  type Mutation {
    createUser(userInput: UserInput): UserResponse
  }`;
