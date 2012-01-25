module.exports = function(barcode, req, res) {
  res.render('world.html', { title: 'Hello World', dothis: "keep you healthy", barcode: barcode || "12345" })
}