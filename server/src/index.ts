import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./UserResolver";
import { createConnection } from "typeorm";
import cookieParser from "cookie-parser";
import cors from "cors";
import { InvalidToken } from "./entity/InvalidToken";
import { sendRefreshToken } from "./token";
import { User } from "./entity/User";
import { verify } from "jsonwebtoken";

(async () => {
  const app = express();
  app.use(
    cors({
      credentials: true,
      origin: true,
    })
  );
  app.use(cookieParser());
  app.get("/", (_, res) => {
    res.send("hi");
  });
  app.post("/auth/token_refresh", async (req, res) => {
    const token = req.cookies.oid;
    if (!token) {
      return res.status(401).send("Invalid Token.");
    }
    const blacklisted = await InvalidToken.findOne({ token });
    if (blacklisted) {
      return res.status(401).send("Invalid Token.");
    }
    try {
      const payload = verify(token, process.env.JWT_REFRESH_SECRET!) as any;
      const user = await User.findOne({ id: payload.uid });
      await InvalidToken.insert({ token: token });
      sendRefreshToken(user!, res);
      return res.status(200).end();
    } catch (err) {
      console.log(err);
      return res.status(401).send("Invalid Token.");
    }
  });

  await createConnection();

  const apolloserver = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await apolloserver.start();
  apolloserver.applyMiddleware({ app });
  app.listen(process.env.PORT || 8080, () => {
    console.log("express server started");
  });
})();
//createConnection().then(async connection => {
//
//    console.log("Inserting a new user into the database...");
//    const user = new User();
//    user.firstName = "Timber";
//    user.lastName = "Saw";
//    user.age = 25;
//    await connection.manager.save(user);
//    console.log("Saved a new user with id: " + user.id);
//
//    console.log("Loading users from the database...");
//    const users = await connection.manager.find(User);
//    console.log("Loaded users: ", users);
//
//    console.log("Here you can setup and run express/koa/any other framework.");
//
//}).catch(error => console.log(error));
