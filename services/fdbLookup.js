var fdb = require('/etc/fdb.js');

module.exports = function(wmUpc, onSuccessFn, nextFn) {
    console.log('lookup up [' + wmUpc + '] on fdb');
    var found = fdb[wmUpc];
    console.log('found ' + found);
    if (found) onSuccessFn(cleanData(found));

    nextFn();

    function cleanData(rawData) {
	var split = rawData.split('|');
	return {"price":split[0], "countryCode":split[1]};
    }
}
