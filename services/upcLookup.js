var rpcKey = 'e5a51bca97dca69e1fe8b1f1560bb507cfbb579e';
var myCache = {12345 : {"description":"dummy description", "issuerCountry":"Australia"}};
var xmlrpc = require('xmlrpc');
var client = xmlrpc.createClient({ 
    host: 'www.upcdatabase.com', 
    port: 80, 
    path: '/xmlrpc'
});

module.exports = {

    getCache : function(id) { myCache[id] },
    setCache : function(id, val) { myCache[id] = val },

    lookupService : function(upc, handler) {
	client.methodCall('lookup', [{'rpc_key': rpcKey, "upc":upc}], function(error, value) {
	    handler(!error && value.status == "success" ? value : null);
	});
    },

    cleanData : function(rawData) {
	return {"name":rawData.description,"countryCode":rawData.issuerCountryCode};
    }
}
