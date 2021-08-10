const app = require("express")();
const postService = require('../services/postService');

app.get("/post", async (_, response) => {
  try {
    response.send(await postService.getAll());
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/post", async (request, response) => {
  try {
    response.send(await postService.create(request.body));
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;