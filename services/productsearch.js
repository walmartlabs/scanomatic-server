var xmlrpc = require('xmlrpc');
var client = xmlrpc.createClient(
    { host: 'www.upcdatabase.com', 
      port: 80, 
      path: '/xmlrpc'
    });

require('./jdb');
var fdb = require('/etc/fDb');

var rpcKey = 'e5a51bca97dca69e1fe8b1f1560bb507cfbb579e';

module.exports = function(barcode, req, res) {

//    var rec = jdb.barcode;
//    console.log(JSON.stringify(rec));

//    if (rec)
//	lookupWalmartCom(rec.id); // get correct ID
//    else
	searchFdb();

    function lookupWalmartCom(id) {
//	http://mobile.walmart.com/m/j?service=Item&method=get&p1=11027487
	res.render('walmartCom.html', 
		   { name: "Walmart Com",
		     country: "Country",
		     productPage: 'http://upcdata.info/lookup/' + barcode
		   });
    }

    function searchFdb() {
	var fDbbarcode = trimNumber(barcode);
	fDbbarcode = fDbbarcode.substr(0, fDbbarcode.length - 1);
	console.log("searching fDB for barcode " + fDbbarcode);
	var priceAndCountry = fdb.fdb[fDbbarcode];
	
	if (priceAndCountry) {
	    var price = priceAndCountry.split('|')[0];
	    var country = priceAndCountry.split('|')[1];
	    console.log("price " + price + ", country " + country);
	    
	    client.methodCall('lookup', [{'rpc_key': rpcKey, "upc":barcode}], 
			      function(error, value) {
				  if (value.status == "fail") {
				      res.render('fDb.html', 
						 { name: "We found a price",
						   'price': price,
						   'country': country, 
						   productPage: 'http://upcdata.info/lookup/' + barcode});
				  } else {
				      res.render('fDb.html', 
						 { name: value.description,
						   'price': price,
						   'country': value.issuerCountry,
						   productPage: 'http://upcdata.info/lookup/' + barcode });
				  }
			      })
	}
	else
	    searchUpcDb();
    }

    function trimNumber(s) {
	while (s.substr(0,1) == '0' && s.length>1) { s = s.substr(1); }
	return s;
    }

    function searchUpcDb() {
	console.log("searching upc DB with barcode " + barcode);
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
		     country: value.issuerCountry || "some country",
		     productPage: 'http://upcdata.info/lookup/' + barcode})}
		     
}

// drop leading 0
// drop the checksum

// product page http://upcdata.info/lookup/0038000765414/
