var xmlrpc = require('xmlrpc');
var client = xmlrpc.createClient(
    { host: 'www.upcdatabase.com', 
      port: 80, 
      path: '/xmlrpc'
    });

require('./jdb');
//require('/etc/fDb');

var rpcKey = 'e5a51bca97dca69e1fe8b1f1560bb507cfbb579e';

module.exports = function(barcode, req, res) {

    var rec = jDb.barcode;
    console.log(JSON.stringify(rec));

    if (rec)
	lookupWalmartCom(rec.id); // get correct ID
    else
	searchFDb();

    function lookupWalmartCom(id) {
//	http://mobile.walmart.com/m/j?service=Item&method=get&p1=11027487
	res.render('walmartCom.html', 
		   { name: "Walmart Com",
		     country: "Country"})
    }

    function searchFdb() {
//	var rec = fdb.barcode;
	
//	if (rec)
//	    res.render('product.html', 
//		       { name: "Fucked DB",
//			 country: "Fucked up country"})
//	else
	    searchUpcDb();
    }

    function searchUpcDb() {
	client.methodCall('lookup', [{'rpc_key': rpcKey, "upc":barcode}], handle);
    }

    function handle(error, value) {
	if (value.status == "fail")
	    require('./chuckNorris.js')(req, res);
	else
	    onSuccess(value)}

    function onSuccess(value) {
	console.log(JSON.stringify(value));
	res.render('product.html', 
		   { name: value.description || "Thingy",
		     country: value.issuerCountry || "some country"})}
		     
}

// drop leading 0
// drop the checksum

// product page http://upcdata.info/lookup/0038000765414/
