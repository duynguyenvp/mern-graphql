import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";
import { makeExecutableSchema } from "@graphql-tools/schema";

import types from "./graphql/types/index";
import resolvers from "./graphql/resolvers/index";
import { getErrorCode } from "./utils/response";

const schema = makeExecutableSchema({
  typeDefs: types,
  resolvers: resolvers
});
const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
    customFormatErrorFn: err => {
      const error = getErrorCode(err.message);
      return { message: error.message, statusCode: error.statusCode };
    }
  })
);

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}!`);
    });
  })
  .catch(err => {
    console.log(err);
  });
