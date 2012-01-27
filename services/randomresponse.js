var fs = require('fs');
var hits = 0;

module.exports = function(req, res) {

    renderFile(function() {
	if (hits % 10 == 0)
	    randomResponse()
	else
	    res.send('nothing')
    });

    function renderFile(onFileNotExists) {
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

    function randomResponse() {
	res.render('world.html', 
		   { title: 'Moo World', 
		     dothis: "random", 
		     barcode: "123"
		   });
    }

    hits++;
}

