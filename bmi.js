const express = require("express");
const bodyparser = require("body-parser");
var Module = require('module');
var fs     = require('fs');

Module._extensions['.jpg'] = function(module, fn) {
  var base64 = fs.readFileSync(fn).toString('base64');
  module._compile('module.exports="data:image/jpg;base64,' + base64 + '"');
};
const port = 3000

const app = express();
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/" + "xixi.html");
});

app.post("/", function (req, res) {
	const gambarKurus = require("./assets/2.jpg");
	const gambarNormal = require("./assets/1.jpg");
	const gambarGemuk = require("./assets/3.jpg");
	const gambarObesitas = require("./assets/4.jpg");
	const tinggi = parseFloat(req.body.Tinggi);
	const tinggiMeter = tinggi / 100;
	const berat = parseFloat(req.body.Berat);
	let bmi = ( berat / Math.pow(tinggiMeter, 2));

	bmi = bmi.toFixed();

	if (bmi < 19) 
	{res.send (" BMI Anda: " + bmi +
				"<h1>Keceng Lur</h1>"+
				"<img src='"+ gambarKurus +"' />");} 
	else if (19 <= bmi && bmi < 25) 
	{res.send (" BMI Anda: " + bmi +
				"<h1>Berat Normal</h1>"
				+
				"<img src='"+ gambarNormal +"' />");} 
	else if (25 <= bmi && bmi < 30) 
	{res.send (" BMI Anda: " + bmi +
				"<h1>Berat Anda GakKaruan</h1>"
				+
				"<br><img src='"+ gambarGemuk +"' />");} 
	else if (30 <= bmi && bmi < 1000)
	{res.send (" BMI Anda:" + bmi +
				"<h1>Iso Mlaku Ndak?</h1>"
				+
				"<img src='"+ gambarObesitas +"' style='display: block !important;' />");}
	else {res.send ("<h1>Hueh Isisen</h1>");}

});

app.listen(port, () => {
  console.log(`Masuk http://localhost:${port}`)
});
