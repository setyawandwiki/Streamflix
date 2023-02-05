const app = require("./app");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.log(e));

const port = process.env.PORT || 8000;

console.log(port);

app.listen(port, () => {
  console.log(`your server running at http://localhost:${port}`);
});
