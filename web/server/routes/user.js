var express = require('express');
var router = express.Router();
var util = require('../utils/util');
var User = require('mongoose').model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res){
  const {username, pwd} = req.body;
  console.log(username, pwd);
	User.findOne({username}, function(err,doc){
		if (doc) {
			return res.json({code:1, msg:'用户名重复'});
		}
    
		const userModel = new User({username, pwd: util.md5Pwd(pwd)});
		userModel.save(function(e,d){
			if (e) {
				return res.json({code:1,msg:'后端出错了'});
      }
      // set cookie after register
      const {username, _id} = d;
  		res.cookie('userid', _id);    
			return res.json({code:0,data: {username, _id}});
		});
	});
});

module.exports = router;
