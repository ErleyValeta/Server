const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

const mercadopago = require("mercadopago");

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "APP_USR-4262492901673586-071401-f6e50cf94f6ca96fe34469eaead39f2b-1901490992",
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use(express.static("../../client/html-js"));
app.use(express.static(path.join(__dirname, "../Proyecto_E-commerce_G4/")))
app.use(cors());
app.get("/", function (req, res) {
	res.status(200).sendFile("index.html");
});

app.post("/create_preference", (req, res) => {

    console.log(req.body);
	let preference = {
		items: [
			{
				title: req.body[0].description,
				unit_price: Number(req.body[0].price),
				quantity: Number(req.body[0].quantity),
			},
            {
				title: req.body[1].description,
				unit_price: Number(req.body[1].price),
				quantity: Number(req.body[1].quantity),
			},
            {
				title: req.body[2].description,
				unit_price: Number(req.body[2].price),
				quantity: Number(req.body[2].quantity),
			},
		],
		back_urls: {
			"success": "http://localhost:8080",
			"failure": "http://localhost:8080",
			"pending": "http://localhost:8080"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});

app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});
