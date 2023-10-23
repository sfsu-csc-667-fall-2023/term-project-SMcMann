const express = require("express");
const createError = require("http-errors");
const app = express();
app.use(requestTime);
 
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "backend", "static")));
const rootRoutes = require("./routes/root");
app.use("/", rootRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});

app.use((request, response, next) => {
  next(createError(404));
});