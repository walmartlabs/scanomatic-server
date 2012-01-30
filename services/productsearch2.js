var fdbLookup = require('./fdbLookup');
var upcLookup = require('./upcLookup');
var wmComLookup = require('./wmComLookup');

module.exports = function(upc, req, res) {

    var product = { productPage:'http://upcdata.info/lookup/' + upc};
    var wmUpc = toWmUpc(upc);
    
    fdbLookup(wmUpc, merge, doUpcLookup);

    function doUpcLookup() {
	cacheLookup(upc, upcLookup, doWmComLookup);
    }

    function doWmComLookup() {
	cacheLookup(wmUpc, wmComLookup, render);
    }

    function render() {
	res.render('walmartCom.html', 
		   { name: product.name,
		     country: product.country,
		     productPage: product.productPage
		   });
    }

    function cacheLookup(id, service, nextFn) {
	console.log("looking up [" + id + "]");
	var cached = service.getCache(id);
	
	if (!cached) service.lookupService(id, handleLookup);
	else go(cached, service.cleanData);

	function handleLookup(data) {
	    if (data) service.setCache(data);
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
	

