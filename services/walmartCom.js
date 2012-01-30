var request = require('request');
var itemCache = {};

module.exports = {

    lookupByItemId : function(itemId, handler) {

	console.log("checking cache for " + itemId);
	var cached = itemCache[itemId];
	if (cached)
	    handler(false, {"statusCode":200}, cached);
	else
	    request('http://mobile.walmart.com/m/j?service=Item&method=get&p1=' + itemId, 
		    handleClientCall);

	function handleClientCall(error, response, body) {
	    if (!error && response.statusCode == 200)
		itemCache[itemId] = body;
	    
	    handler(error, response, body);
	}
    }

}

