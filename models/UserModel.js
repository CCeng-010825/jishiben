
const mongoose = require("mongoose");

// const config = require("../config/config");
// mongoose.connect(
//   `mongodb://${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`
// );
let userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
let UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
