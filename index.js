const express = require("express");
const userRoute = require("./routes/user");

const app = express();
const PORT = 3001;

app.use(express.json());

// user managements crud
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  console.log(`server is running at http://localhost:${PORT}`);
});
