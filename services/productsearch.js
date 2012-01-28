var xmlrpc = require('xmlrpc')
var client = xmlrpc.createClient(
    { host: 'www.upcdatabase.com', 
      port: 80, 
      path: '/xmlrpc'
    })

var rpcKey = 'e5a51bca97dca69e1fe8b1f1560bb507cfbb579e';

module.exports = function(barcode, req, res) {
    client.methodCall('lookup', [{'rpc_key': rpcKey, "upc":barcode}], handle);

    function handle(error, value) {
	if (value.status == "fail")
	    require('./chuckNorris.js')(req, res);
	else
	    onSuccess(value)}

    function onSuccess(value) {
	console.log(JSON.stringify(value));
	res.render('world.html', 
		   { title: 'Moo World', 
		     dothis: value.description || "who knows", 
		     barcode: barcode || "123"
		     })}
		     
}

