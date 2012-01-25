module.exports = function(barcode, req, res) {
  res.render('world.html', { title: 'Goodbye World', dothis: "kill you", barcode: barcode || "12345" })
}