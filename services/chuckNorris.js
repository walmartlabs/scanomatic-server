var request = require('request');

module.exports = function(req, res) {
    request('http://api.icndb.com/jokes/random', function (error, response, body) {
	if (!error && response.statusCode == 200) {
	    res.render('chuckNorris.html', 
		       { joke: JSON.parse(body).value.joke });
	} else
	    res.render('fail.html', {});
    })
}
