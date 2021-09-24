import express from "express";

import * as db from "./db.mjs";

const userRouter = express.Router();
// userRouter.use(express.json());

//get users route
userRouter.get("/", async (req, res) => {
  const users = await db.getUsers();
  res.json(users);
});

//put new data users route, setting end point to player name, grabbing info from user and then sending it to the db
userRouter.put("/:player_name", async (req, res) => {
  //how we're grabbing information into the url
  const score = await db.updateScore(req.params.player_name);
  res.json(score);
});

userRouter.use(express.json());

//add user route
userRouter.post("/", async (req, res) => {
  // const user = await db.addUser(request.body.name);
  res.status(201).json(await db.addUser(req.body));
});

export default userRouter;
