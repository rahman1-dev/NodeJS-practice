// console.log("This is server-side code");

const express = require("express");

// instance
const app = express();

//Menu route
app.get("/menu", (request, response) => {
  console.log("response has been sended");
  response.send("This is data you need");
});
app.get("/restaurantCard", (request, response) => {
  console.log("response has been sended");
  response.send("This is data of restaurant card");
});

//.listen() method will make the server to listen the request on it.
app.listen("8080", () => {
  console.log("The server is listening on port 8080....");
});
