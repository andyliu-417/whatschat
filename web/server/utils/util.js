var config = require('../configs/config.json');
const utility = require('utility');

function md5Pwd(pwd){
	const salt = config.salt;
	return utility.md5(utility.md5(pwd+salt));
}

module.exports = {
    md5Pwd
}
