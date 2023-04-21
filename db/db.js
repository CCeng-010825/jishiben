
/**
 * 
 * @param {*} sucess 成功回调
 * @param {*} error 失败回调
 */

module.exports = function (sucess, error) {

  if (typeof error !== "function") {
    error = () => {
      console.log("连接失败~~~~~~~");
    };
  }
  const config = require("../config/config.js");

  const mongoose = require("mongoose");

  mongoose.set("strictQuery", true);
  mongoose.connect(
    `mongodb://${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`
  );
  mongoose.connection.once("open", () => {
    sucess();
  });
  mongoose.connection.on("error", () => {
    //   console.log("连接失败");
    error();
  });
  mongoose.connection.on("close", () => {
    console.log("连接关闭");
  });
};
