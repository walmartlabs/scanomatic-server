var request = require('request');
var jdb = require('./jdb');
var myCache = {};
var lookupUrl = 'http://mobile.walmart.com/m/j?service=Item&method=get&p1=';

module.exports = {

    getCache : function(id) { myCache[id] },
    setCache : function(id, val) { myCache[id] = val },

    lookupService : function(upc, handler) {
	if (!jdb[upc]) 
	    handler(null);
	else 
	    request(lookupUrl + jdb[upc], function(error, response, body) {
		handler(!error && response.statusCode == 200 ? JSON.parse(body) : null);
	    });
    },

    cleanData : function(rawData) {
	return {"name":rawData.name,"productPage":rawData.url};
    }
}

