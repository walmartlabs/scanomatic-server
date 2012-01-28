var request = require('request');

var pics = ['http://9gag.com/gag/1285348', 
	    'http://9gag.com/gag/285408', 
	    'http://imgfave.com/view/1763358',
	    'http://9gag.com/gag/965683',
	    'http://memegenerator.net/instance/10932327'
	   ];

module.exports = function(req, res) {
    request('http://api.icndb.com/jokes/random', function (error, response, body) {
	if (!error && response.statusCode == 200) {
	    res.render('chuckNorris.html', 
		       { joke: JSON.parse(body).value.joke,
		         pic: randomChuck()
		       });
	} else
	    res.render('fail.html', {});
    })
}

// choose a random service
function randomChuck() {
  return pics[Math.floor(pics.length * Math.random())]
}
