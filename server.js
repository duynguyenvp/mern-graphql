import dotenv from "dotenv";
dotenv.config();

import logger from "./logger";
import express from "express";
import compression from "compression";
import cookieParser from "cookie-parser";
import session from "cookie-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { graphqlHTTP } from "express-graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import types from "./graphql/types/index";
import resolvers from "./graphql/resolvers/index";
import { getErrorCode } from "./utils/response";
import jwt from "jsonwebtoken";

const schema = makeExecutableSchema({
  typeDefs: types,
  resolvers: resolvers
});
const app = express();

app.use(cookieParser());
app.use(
  session({
    name: "x-auth",
    saveUninitialized: true,
    resave: true,
    sameSite: true,
    httpOnly: true,
    keys: [process.env.SESSION_KEY],
    maxAge: 90 * 60 * 1000 //90 minutes
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(compression());
app.use(express.static(__dirname + "/"));

app.use(
  "/graphql",
  graphqlHTTP(async request => {
    let login = { auth: undefined };
    if (request.session.xAuth && request.session.yAuth) {
      const token = `${request.session.xAuth}.${request.session.yAuth}`;
      if (token) {
        const user = await jwt.verify(
          token,
          process.env.JWT_SECRET,
          (err, decoded) => {
            if (!err) return decoded;
          }
        );
        login = {
          auth: user
        };
      }
    }

    return {
      schema: schema,
      graphiql: true,
      context: login,
      rootValue: {
        session: request.session,
        logout: request.logout,
        logOut: request.logOut
      },
      customFormatErrorFn: err => {
        console.log(err);
        const error = getErrorCode(err.message);
        return { message: error.message, statusCode: error.statusCode };
      }
    };
  })
);

app.disable("x-powered-by");

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      logger.info(`Server is running on port ${process.env.PORT}!`);
      console.log(`Server is running on port ${process.env.PORT}!`);
    });
  })
  .catch(err => {
    console.log(err);
  });
