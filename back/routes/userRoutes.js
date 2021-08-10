const app = require("express")();
const userService = require('../services/userService');

app.get("/user", async (_, response) => {
  try {
    response.send(await userService.getAllAsync());
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post("/user", async (request, response) => {
  try {
    response.send(await userService.createAsync(request.body));
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = app;