const express = require("express");
// const app=express()
const router = express.Router();
const UserModel = require("../../models/UserModel");
const md5=require('md5')

router.get("/reg", (req, res) => {
  res.render("auth/reg");
});
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/reg", (req, res) => {
  // console.log(req.body)
  UserModel.create({ ...req.body,password:md5(req.body.password) }, (err, data) => {
    if (err) {
      res.status(500).send("注册失败~~·");
      return;
    }
    res.render("success", { msg: "注册成功", url: "/login" });
  });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  UserModel.findOne({username: username, password: md5(password)}, (err, data) => {
    if (err) {
      res.status(500).send("登录，请稍后再试");
      return;
    }
    if (!data) {
      return res.send("账号或密码错误~~~");
    }
// console.log(data)
// return
    // console.log(req.body);
    req.session.username = data.username;
    req.session._id = data._id
    res.render("success", { msg: "登陆成功", url: "/account" });
  });
});

router.post('/logout',(req,res)=>{
   req.session.destroy(()=>{
    res.render('success', {msg: '退出成功', url: '/login'});
   })
})

module.exports = router;
