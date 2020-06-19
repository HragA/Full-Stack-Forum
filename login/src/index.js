import express from "express";
import pool from "./db";
const app = new express();

app.get("/user", (req, res) => {
  const userId = req.state.userId;
  const client = pool.checkoutClient();
  //do a lookup
  client.close();
});

app.listen(3001);
