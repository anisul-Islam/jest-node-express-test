const userRoute = require("express").Router();

const usersData = require("../data/users.json");
const saveData = require("../helper/saveData");

userRoute.get("/", (req, res) => {
  res.json(usersData);
});

userRoute.post("/", (req, res) => {
  const { name, age } = req.body;
  const id = Math.random();

  if (!name || !age) {
    return res.status(400).json({
      error: "name or age is missing",
    });
  }

  const newUser = { id, name, age };
  usersData.push(newUser);

  const isSaved = saveData(usersData);
  if (!isSaved) {
    return res.status(500).json({
      error: "user data was not stored",
    });
  }
  return res.status(201).json({ message: "user was created " });
});

userRoute.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const existingUser = usersData.find((user) => user.id === Number(id));

  if (!existingUser) {
    return res.status(404).json({
      error: "no user found with this id",
    });
  }

  let updateUser = null;
  const updateUsers = usersData.map((user) => {
    if (user.id === Number(id)) {
      updateUser = {
        ...user,
        name,
        age,
      };
      return updateUser;
    }
    return user;
  });

  const isSaved = saveData(updateUsers);
  if (!isSaved) {
    return res.status(500).json({
      error: "user data was not stored",
    });
  }
  return res.status(200).json({ message: "user was updated " });
});

userRoute.delete("/:id", (req, res) => {
  const { id } = req.params;

  const existingUser = usersData.find((user) => user.id === Number(id));

  if (!existingUser) {
    return res.status(404).json({
      success: false,
      error: "no user found with this id",
    });
  }

  const updatedDataAfterDeleting = usersData.filter(
    (user) => user.id !== Number(id)
  );

  const isSaved = saveData(updatedDataAfterDeleting);
  if (!isSaved) {
    return res.status(500).json({
      error: "user data was not stored",
    });
  }
  return res.status(200).json({ message: "user was deleted " });
});

module.exports = userRoute;
