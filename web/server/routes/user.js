var express = require("express");
var router = express.Router();
var util = require("../utils/util");
var User = require("mongoose").model("User");
var Chat = require("mongoose").model("Chat");

const _filter = { pwd: 0, __v: 0 };

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/* GET users listing. */
router.get("/list", function(req, res) {
  User.find({}, function(err, doc) {
    return res.json(doc);
  });
});

router.post("/register", function(req, res) {
  const { username, pwd, avatar } = req.body;
  User.findOne({ username }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: "用户名重复" });
    }

    const userModel = new User({ username, pwd: util.md5Pwd(pwd), avatar });
    userModel.save(function(e, d) {
      if (e) {
        return res.json({ code: 1, msg: "后端出错了" });
      }
      // set cookie after register
      const { username, _id, avatar } = d;
      res.cookie("userid", _id);
      return res.json({ code: 0, data: { username, _id, avatar } });
    });
  });
});

router.post("/login", function(req, res) {
  const { username, pwd } = req.body;
  User.findOne({ username, pwd: util.md5Pwd(pwd) }, _filter, function(
    err,
    doc
  ) {
    if (!doc) {
      return res.json({ code: 1, msg: "用户名或者密码错误" });
    }
    // set cookie after login
    res.cookie("userid", doc._id);
    return res.json({ code: 0, data: doc });
  });
});

router.post("/readmsg", function(req, res) {
  const userid = req.cookies.userid;
  const { from } = req.body;
  Chat.update(
    { from, to: userid },
    { $set: { read: true } },
    { multi: true },
    function(err, doc) {
      if (!err) {
        return res.json({ code: 0 });
      }
      return res.json({ code: 1 });
    }
  );
});

router.get("/info", function(req, res, next) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findOne({ _id: userid }, _filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: "后端出错了" });
    }
    if (doc) {
      return res.json({ code: 0, data: doc });
    } else {
      return res.json({ code: 1, msg: "no data" });
    }
  });
});

router.get("/friendlist", function(req, res) {
  const userid = req.cookies.userid;
  User.find({ _id: { $ne: userid } }, function(err, doc) {
    return res.json({ code: 0, data: doc });
  });
});

router.get("/getMsgList", function(req, res) {
  const userid = req.cookies.userid;
  User.findOne({ _id: userid }, _filter, function(err, user) {
    if (err) {
      return res.json({ code: 1, msg: "后端出错了" });
    }
    if (user) {
      Chat.find({ $or: [{ from: user._id }, { to: user._id }] }, function(
        err,
        doc
      ) {
        if (!err) {
          User.find({}, function(err, allusers) {
            var users = {};
            allusers.forEach(v => {
              users[v._id] = { username: v.username, avatar: v.avatar };
            });
            return res.json({ code: 0, users: users, msgs: doc });
          });
          // return res.json({code:0, msgs:doc});
        }
      });
    } else {
      return res.json({ code: 1, msgs: "no data" });
    }
  });
});

module.exports = router;
