const Controller = require("./lib/Controller");
const Users = require("./users");
const Books = require("./books");

module.exports = {
  ...new Controller(),
  users: new Users(),
  books: new Books(),
};
