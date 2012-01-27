module.exports = function(barcode, req, res) {
  res.render('world.html', { title: 'Moo World', dothis: doTheMoo(barcode), barcode: barcode || "123" })
}

function doTheMoo(barcode) {
    return "Who is the Moo?";
}
