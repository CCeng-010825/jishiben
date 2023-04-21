var express = require("express");
var router = express.Router();
const AccountModel = require("../../models/accountModel");
const moment = require("moment");

const tokenMiddle = require("../../middlewares/checkToken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/success", (req, res, next) => {
  res.render("success");
});

router.get("/account", tokenMiddle, (req, res, next) => {
  AccountModel.find()
    .sort({ time: -1 })
    .exec((err, data) => {
      if (err) {
        res.json({
          code: 1001,
          msg: "查询失败~~~~",
          data: null,
        });
        return;
      }
      res.json({
        code: 0000,
        msg: "查询成功~~",
        data: data,
      });
      //   res.render("list", { accounts: data, moment: moment });
    });
});
router.get("/account/create", tokenMiddle, (req, res, next) => {
  res.render("create");
});
router.post("/accounttt", tokenMiddle, (req, res, next) => {
  console.log({ ...req.body });
  AccountModel.create({ ...req.body }, (err, data) => {
    if (err) {
      return res.json({
        code: 1002,
        msg: "创建失败~~",
        data: null,
      });
    }
    res.json({
      code: 0000,
      msg: "创建成功~~",
      data: data,
    });
    // res.render("success", { msg: "添加成功", url: "/account" });
  });
});

router.delete("/account/:id", tokenMiddle, (req, res) => {
  let { id } = req.params;
  AccountModel.deleteOne({ _id: id }, (err, data) => {
    if (err) {
      res.json({
        code: 1003,
        msg: "删除失败~~",
        data: null,
      });
      return;
    }
    res.json({
      code: 0000,
      msg: "删除成功~~",
      data: {},
    });
    res.render("success", { msg: "删除成功", url: "/account" });
  });
});

//获取单个账单
router.get("/account/:id", tokenMiddle, (req, res, next) => {
  let { id } = req.params;
  AccountModel.findById(id, (err, data) => {
    if (err) {
      return res.json({
        code: 1004,
        msg: "查询单个账单出错~~",
        data: null,
      });
    }
    res.json({
      code: 0000,
      msg: "查询单个账单成功~~",
      data: data,
    });
  });
});

//更新某个账单
router.patch("/account/:id", tokenMiddle, (req, res) => {
  let id = req.params.id;
  AccountModel.updateOne({ _id: id }, req.body, (err, data) => {
    if (err) {
      res.json({
        code: 1005,
        msg: "更新失败",
        data: null,
      });
      return;
    }
    AccountModel.findById(id, (err, data) => {
      if (err) {
        res.json({
          code: 1006,
          msg: "读取失败",
          data: null,
        });
        return;
      }
      res.json({
        code: 0000,
        msg: "更新成功",
        data: data,
      });
    });
  });
});
module.exports = router;
