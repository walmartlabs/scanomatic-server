require('./jdb');
var fdb = require('/etc/fDb');
var upcDb = require('./upcDatabase');

var chuckNorris = require('./chuckNorris')

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
	var priceAndCountry = lookupPriceAndCountry();
	
	if (priceAndCountry) {
	    var price = priceAndCountry.split('|')[0];
	    var country = priceAndCountry.split('|')[1];

	    upcDb.lookup(barcode, handleUpcLookup);

	    function handleUpcLookup(error, value) {
		console.log(JSON.stringify(value));
		name = value.status == "fail" ? "We found a price" : value.description;
		country = value.status == "fail" ? country : value.issuerCountry;
		res.render('fDb.html', 
			   { 'name': name,
			     'price': price,
			     'country': country, 
			     productPage: 'http://upcdata.info/lookup/' + barcode});
	    }
	}
	else
	    searchUpcDb();
    }

    function lookupPriceAndCountry() {
	var fDbbarcode = trimNumber(barcode);
	fDbbarcode = fDbbarcode.substr(0, fDbbarcode.length - 1);
	return fdb.fdb[fDbbarcode];
    }


    function searchUpcDb() {
	upcDb.lookup(barcode, handle);
    }

    function handle(error, value) {
	if (value.status == "fail")
	    chuckNorris(req, res);
	else
	    onSuccess(value)}

    function onSuccess(value) {
	console.log(JSON.stringify(value));
	res.render('product.html', 
		   { name: value.description || "Some product",
		     country: value.issuerCountry || "some country",
		     productPage: 'http://upcdata.info/lookup/' + barcode})}
		     
}

function trimNumber(s) {
    while (s.substr(0,1) == '0' && s.length>1) { s = s.substr(1); }
    return s;
}
