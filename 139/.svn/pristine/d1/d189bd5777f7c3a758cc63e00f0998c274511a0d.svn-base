var search = require('../../query/save_and_get_data_in_MongoDB/position/search.js');

exports = module.exports = function(req, res) {

	search.findLocationFullnames( function(err, allnames) {
		if(err) {	
			// if err, the profile contains err message. pointing which userid not found
			res.send(err);
		}else{
			res.send(allnames);
		}
	});
}