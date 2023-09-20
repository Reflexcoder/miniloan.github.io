const app = require("./app.js");

const Connection = require("./config/database.js");

//Handling uncaughtException
process.on("uncaughtException", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection.`);

  process.exit(1);
});

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

const PORT = process.env.PORT || 8000;

Connection();

app.get("/", (req, res) => {
  res.send("Hello World!"); // This will serve your request to '/'.
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise Rejection.`);

  server.close(() => {
    process.exit(1);
  });
});
