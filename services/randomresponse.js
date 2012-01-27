var hits = 0;

module.exports = function(req, res) {

    if (hits % 10 == 0)
	randomResponse()
    else
	emptyReturn()

    function randomResponse() {
	res.render('world.html', 
		   { title: 'Moo World', 
		     dothis: "randomResponse", 
		     barcode: "123"
		   })
    }

    function emptyReturn() {
	res.send('nothing');
    }

    console.log("hits: " + hits);

    hits++;
}

