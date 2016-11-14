'use strict'

const express = require('express');
const service = express();
const request = require('superagent');
const moment = require('moment');

// geo: AIzaSyDcCt-aMH1rNwzp33D42nMdbq3ghBXzlGQ

// https://maps.googleapis.com/maps/api/timezone/json?location=38.908133,-77.047119&timestamp=1458000000&key=YOUR_API_KEY
// AIzaSyAKtNTHS8nOuXOP8hP057JJcH_l59Hgdqc
service.get('/service/:location', (req, res, next) => {
	request.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + req.params.location + '&key=AIzaSyDcCt-aMH1rNwzp33D42nMdbq3ghBXzlGQ', (err, response) => {
		if(err) {
			console.log(err);
			return res.sendStatus(500);
		}

		const location = response.body.results[0].geometry.location;
		const timestamp = +moment().format('X');

		request.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + location.lat + ',' + location.lng + '&timestamp=' + timestamp + '&key=AIzaSyAKtNTHS8nOuXOP8hP057JJcH_l59Hgdqc', (err, response) => {
			if(err) {
				console.log(err);
				return res.sendStatus(500);
			}

			const result = response.body;
			const timeString = moment.unix(timestamp + result.dstOffset + result.rawOffset).utc().format('dddd, MMMM Do YYYY, h:mm:ss a');

			res.json({result: timeString});
		});
	});
});

module.exports = service;
