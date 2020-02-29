const express = require("express");
const {Router} = require("express");
const Subscribe = require("../models/subscribe");
const nodemailer = require("nodemailer");
const router = Router();

router.get("/", function(req, res, next) {
	Subscribe.find(function(err, lesson) {
		if (err) throw new Error(err);
		res.json(lesson);
	});
});

router.post("/send", function(req, res, next) {
	const {name, email} = req.body;
	console.log(name, email);
	if (!name || !email) {
		next();
	} else {
		Subscribe.create(req.body, (err, post) => {
			if (err) throw new Error(err);
			res.json({message: "Success", code: 200});
		});
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "albert.hovhannisyan.main@gmail.com",
				pass: "alberthovh02"
			}
		});

		const mailOptions = {
			from: "albert.hovhannisyan.main@gmail.com",
			to: email,
			subject: "Excelist ակումբ",
			text: "Դուք բաժանորդագրվել էք Excelist ակումբի նորություններին, շնորհակալ ենք մեզ վստահելու համար:"
		};

		transporter.sendMail(mailOptions, function(error, info) {
			if (error) {
				console.log(error);
				res.json({code: 400, message: 'something went wrong'}).code(400)
			} else {
				console.log("Email sent: " + info.response);
				res.json({code: 200, message: 'empty data'}).code(200)
			}
		});
	}
});

router.post("/sendMail", function(req, res, next){
	const { text, link, data } = req.body;
	if(!text || !link) {
		res.json({message: "Empty data", code: 400})
	}else{
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: "albert.hovhannisyan.main@gmail.com",
				pass: "alberthovh02"
			}
		});

		Subscribe.find(function(err, subscriber) {
			if (err) throw new Error(err);
			collectUsers(subscriber)
			subscriber.map((item) => {
				const mailOptions = {
					from: "albert.hovhannisyan.main@gmail.com",
					to: item.email,
					subject: "Excelist new message",
					html: `<div><p>${text}<p><br/><br/>${link}<div style='display: flex;flex-direction:row;justify-content: space-between'><a href="https://web.facebook.com/Excel.lessons/?fref=ts&_rdc=1&_rdr"><img src=""/></a><a><img/></a><a><img/></a></div></div>`
				};

				transporter.sendMail(mailOptions, function(error, info) {
					if (error) {
						console.log(error);
						res.json({code: 400, message: `Նամակը չի ուղարկվել տեխ. խնդրի պատճառով`}).code(400)
					} else {
						console.log("Email sent: " + info.response);
						res.json({code: 200, message: `Նամակը հաջողությամբ ուղարկվել է օգտատերերին`}).code(200)
					}
				});
			})
		});
	}
})
module.exports = router;
