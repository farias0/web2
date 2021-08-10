const app = require("express")();
const postService = require('../services/postService');

app.get("/post", async (_, response) => {
  try {
    response.send(await postService.getAllAsync());
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/post", async (request, response) => {
  try {
    response.send(await postService.createAsync(request.body));
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;