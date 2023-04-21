var express = require("express");
var router = express.Router();
// const fs = require("fs");
// const path = require("path");
// const low = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");
// const adapter = new FileSync(__dirname + "/../data/db.json");
// const db = low(adapter);
// const shortid = require("short-id");
// const AccountModel = requir../models/accountModel.js.js');
const AccountModel=require('../../models/accountModel')
const isloginMiddle=require('../../middlewares/checkIslogin')
const moment=require('moment')

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render("index", { title: "Express" });
  res.redirect('/login')
});

router.get("/success", (req, res, next) => {
  // res.render()
  // let str=fs.readFileSync(path.resolve(__dirname,'../static/success.html'))
  // console.log(str)
  res.render("success");
  // res.sendFile(path.resolve(__dirname,'../static/success.html'))
});

router.get("/account",isloginMiddle, (req, res, next) => {
  // res.render("list");
  // const accounts=db.get('accounts').value()
  // res.render('list',{accounts})
  // accountModel.find((err,data)=>{
  //   if(err){
  //     console.log(err)
  //     return
  //   }
  //   res.render('list',{data})
  // })
  AccountModel
    .find()
    .sort({ time: -1 })
    .exec((err, data) => {
      if (err) {
        res.status(500).send("查询失败~~");
        return;
      }
      res.render('list',{ accounts: data,moment:moment });
    });
});
router.get("/account/create",isloginMiddle, (req, res, next) => {
  res.render("create");
  // console.log(db)
});
router.post("/accounttt",isloginMiddle, (req, res, next) => {
  // console.log(req);
  // let id=shortid.generate()
  // db.get('accounts').unshift({id:id,...req.body}).write()
  // res.render('success',{msg:'添加成功', url: '/account'})
  console.log({ ...req.body });
  AccountModel.create({ ...req.body }, (err, data) => {
    if (err) {
      res.status(500).send("添加失败~");
      return;
    }
    // res.render('success')
    res.render("success", { msg: "添加成功", url: "/account" });
  });
});

router.get("/account/:id", isloginMiddle,(req, res) => {
  let { id } = req.params;
  // db.get("accounts").remove({ id: id }).write();
  // res.render("success", { msg: "删除成功", url: "/account" });
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send("删除失败");
      return;
    }
    res.render("success", { msg: "删除成功", url: "/account" });
  });
});
module.exports = router;
