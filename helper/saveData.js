const fs = require("fs");
const path = require("path");

const saveData = (userData) => {
  try {
    const pathName = path.join(__dirname, "../data/users.json");
    fs.writeFileSync(pathName, JSON.stringify(userData));
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = saveData;
