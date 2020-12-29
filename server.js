import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";

import graphQlSchema from "./graphql/schemas/index";
import graphQlResolvers from "./graphql/resolvers/index";

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);
app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

// mongoose
//   .connect(
//     `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ntrwp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
//   )
//   .then(() => {
//     app.listen(3000, () => {
//       console.log("Server is running on port 3000!");
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });
