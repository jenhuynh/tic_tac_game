import express from "express";

import * as db from "./db.mjs";

const userRouter = express.Router();
userRouter.use(express.json());

userRouter.get("/", async (request, response) => {
  const users = await db.getUsers();
  response.json(users);
});

userRouter.use(express.json());
userRouter.post("/", async (request, response) => {
  const user = await db.adduser(request.body.name);
  response.status(201).json(user);
});

export default userRouter;
