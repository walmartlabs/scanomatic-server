var rpcKey = 'e5a51bca97dca69e1fe8b1f1560bb507cfbb579e';
var upcCache = {12345 : {"description":"dummy description", "issuerCountry":"Australia"}};
var xmlrpc = require('xmlrpc');
var client = xmlrpc.createClient({ 
    host: 'www.upcdatabase.com', 
    port: 80, 
    path: '/xmlrpc'
});

module.exports = {

    lookup : function(barcode, handler) {
	var cached = upcCache[barcode];
	if (cached)
	    handler(null, cached);
	else
	    client.methodCall('lookup', [{'rpc_key': rpcKey, "upc":barcode}], handleClientCall);

	function handleClientCall(error, value) {
	    if (value.status == "success")
		upcCache[barcode] = value;
	    
	    handler(error, value);
	}
    }

}

