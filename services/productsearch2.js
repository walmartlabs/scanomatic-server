var fdbLookup = require('./fdbLookup');
var upcLookup = require('./upcLookup');
var wmComLookup = require('./wmComLookup');
var renderChuck = require('./chuckNorris');

module.exports = function(upc, req, res) {

    var product = { productPage:'http://upcdata.info/lookup/' + upc};
    var wmUpc = toWmUpc(upc);

    cacheLookup(wmUpc, fdbLookup, doUpcLookup);

    function doUpcLookup() {
	cacheLookup(upc, upcLookup, doWmComLookup);
    }

    function doWmComLookup() {
	cacheLookup(wmUpc, wmComLookup, render);
    }

    //-----------------------------

    function render() {
	if (!product.name)
	    renderChuck(res);
	else
	    res.render('walmartCom.html', 
		       { name: product.name,
			 country: product.country,
			 productPage: product.productPage
		       });
    }

    function cacheLookup(id, service, nextFn) {
	console.log("looking up [" + id + "]");
	var cached = service.getCache(id);
	
	if (!(service.inCache(id))) {
	    console.log("looking up service"); service.lookupService(id, handleLookup);
	}
	else go(cached, service.cleanData);

	function handleLookup(data) {
	    service.setCache(id, data);
	    go(data, service.cleanData);
	}

	function go(found, cleanData) {
	    if (found) merge(cleanData(found));
	    nextFn();
	}

    }

    function merge(data) {
	console.log(product);
	for (var attrname in data) {product[attrname] = data[attrname]; }
	console.log(product);
    }

    function toWmUpc(barcode) {
	var fDbbarcode = trimNumber(barcode);
	return fDbbarcode.substr(0, fDbbarcode.length - 1);
    }

    function trimNumber(s) {
	while (s.substr(0,1) == '0' && s.length>1) { s = s.substr(1); }
	return s;
    }

}
	

