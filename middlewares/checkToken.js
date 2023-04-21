const express = require("express");
const jwt = require("jsonwebtoken");
const { sceret } = require("../config/config");
module.exports = (req, res, next) => {
  let token = req.get("token");
  console.log(token)
  if (!token) {
    return res.json({
      code: 3001,
      msg: "token获取失败",
      data: null,
    });
  }
  jwt.verify(token, sceret, (err, data) => {
    if (err) {
      return res.json({
        code: 4001,
        msg: "token校验失败",
        data: null,
      });
    }
    // console.log(req)
    // console.log(data)
    req.user = data; // req.session  req.body
    //如果 token 校验成功
    // console.log(req.user)
    next();
  });
};
