const app = require("express")();
const userService = require('../services/userService');

app.get("/user", async (_, response) => {
  try {
    response.send(await userService.getAll());
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/user", async (request, response) => {
  try {
    response.send(await userService.create(request.body));
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;