const express = require("express");
const postModel = require("../models/postSchema");
const app = express();

app.get("/post", async (request, response) => {
  const post = await postModel.find({});

  try {
    response.send(post);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/post", async (request, response) => {
  const post = new postModel(request.body);

  try {
    await post.save();
    response.send(post);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;