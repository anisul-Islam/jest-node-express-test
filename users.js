// find all the users
// find an user from users
const findUserById = (users, id) => {
  const user = users.find((user) => user.id === id);
  return user;
};
// delete an user from users
// update an user from users
module.exports = { findUserById };
