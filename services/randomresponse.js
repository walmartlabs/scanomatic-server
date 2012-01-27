var fs = require('fs');
var hits = 0;

module.exports = function(req, res) {

    poll(function() {
	if (hits % 10 == 0)
	    randomResponse()
	else
	    res.send('nothing')
    });

    function poll(onFileNotExists) {
	fs.readFile("/tmp/message.txt", function(err, data) {
	    if (err) onFileNotExists();
	    res.render('world.html', 
		       { title: 'Moo World', 
			 dothis: data, 
			 barcode: "123"
		       });
	    fs.unlink("/tmp/message.txt");
	});
    }

    hits++;
}

