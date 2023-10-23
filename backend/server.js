const express = require("express");
const createError = require("http-errors");
const path = require("path");

const requestTime = require("./middleware/request-time");

const app = express();
app.use(requestTime);
app.use(morgan("dev")); // a logging library to facilitate development (and eventually debugging

console.log("Booting Server");

if (process.env.NODE_ENV == "development") { 
  const livereload = require("livereload");
  const connectLiveReload = require("connect-livereload");
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "backend", "static"));

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });

  app.use(connectLiveReload());
}
 
console.log("asdasdasdasd");
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "backend", "static")));

const rootRoutes = require("./routes/root");
app.use("/", rootRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});

app.use((request, response, next) => {
  // console.log(request.headers)
  next(createError(404));
});