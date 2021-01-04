export default `
  type User {
    _id: ID!
    username: String!
    password: String!
    email: String
    age: Int
    isDeleted: Boolean!
  }

  
  type UserResponse {
    success: Boolean!
    message: String
    data: [User]
  }
  
  input UserRegisterInput {
    username: String!
    password: String!
    email: String!
    age: Int
    isDeleted: Boolean!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  type LoginResponse {
    token: String!
  }

  type LogoutResponse {
    success: Boolean!
    message: String
  }

  type Query {
    users: UserResponse
    user(id: ID): UserResponse
    login(loginInput: LoginInput!): LoginResponse
    logout: LogoutResponse
  }

  type Mutation {
    register(userInput: UserRegisterInput): UserResponse
  }`;
