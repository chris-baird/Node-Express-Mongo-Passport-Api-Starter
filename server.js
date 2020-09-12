const app = require("./app");

// Starting server on given port
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
