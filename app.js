//
// app.js -p [port || 3000]
//

//
// Setup and Config
//
var express = require('express')
  , argv = require('optimist').argv
  , opts = parseOptions()

//
// Add new services here
//

// the holder for services plugins
var services = []

//services.push(require('./services/helloworld.js'))
//services.push(require('./services/goodbyeworld.js'))
services.push(require('./services/productsearch.js'))
services.push(require('./services/randomresponse.js'))

//
// Main
//

app = express.createServer()

app.set('views', __dirname + '/views')
app.set("view engine", "hbs")
app.set('view options', { layout: false })
app.register('.html', require('hbs'))

app.get('/productsearch', function(req, res) {
  var barcode = req.param("barcode", "randomresponse");
  console.log("Request for barcode: [" + barcode + "]");
  if (barcode == 'randomresponse')
    services[1](req, res)
  else
    services[0](barcode, req, res)
})

app.listen(opts.port) && console.log("The Scan-O-Matic is up and listening on port: " + opts.port)

//
// Functions
//

// parse command line and return user options
function parseOptions() {
  var opts = {
    port: argv.p || 3010
  }

  return opts
}

// choose a random service
function randomService() {
  return services[Math.floor(services.length * Math.random())]
}
