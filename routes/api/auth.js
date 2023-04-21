const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/UserModel");
const { sceret } = require("../../config/config");
const md5 = require("md5");

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  UserModel.findOne({ username:username, password: md5(password) }, (err, data) => {
    if (err) {
      return res.json({
        code: '2001',
        msg: "数据库连接失败~~",
        data: null,
      });
    }
    if (!data) {
      return res.json({
        code: '2002',
        msg: "账号或密码错误",
        data: null,
      });
    }
    let token = jwt.sign(
      {
        username: data.username,
        _id: data._id,
      },
      sceret,
      { expiresIn: 60 * 60 * 24 * 7 }
    );
    res.json({
      code: '0000',
      msg: "登陆成功~~",
      data: token,
    });
  });
});



module.exports=router
