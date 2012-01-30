var fs = require('fs');
var hits = 0;
var renderChuck = require('./chuckNorris');
module.exports = function(req, res) {

    fs.readFile("/tmp/message.txt", handleReadFile);

    function handleReadFile(err, data) {
	if (err) 
	    decideResponse();
	else 
	   renderAndRemoveFile(data);
    }

    function decideResponse() {
	if (hits % 30 == 0)
	    randomResponse();
	else
	    res.send('nothing');
    }

    function renderAndRemoveFile(data) {
	res.render('message.html', { message: data });
	fs.unlink("/tmp/message.txt");
    }

    function randomResponse() {
	renderChuck(res);
    }

    hits++;
}

