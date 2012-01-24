module.exports = function(barcode, req, res) {
  barcode = barcode || "12345";
  res.send('{ "msg": "goodbye barcode: ' + barcode + '" }');
}