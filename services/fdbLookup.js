var fdb = require('/etc/fdb.js');

module.exports = {

    getCache : function(id) { fdb[id] },
    setCache : function(id, val) { fdb[id] = val},
    inCache : function(id) { return (id in fdb)},

    lookupService : function(upc, handler) {
	handler(null);
    },

    cleanData : function(rawData) {
	var split = rawData.split('|');
	return {"price":split[0], "countryCode":split[1]};
    }
}
