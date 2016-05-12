var express = require('express');
var app = express();

var CONFIG = {
	POINTS: {
		QTY: 100,					// number of points
		MIN: -100,					// minimum value of a point
		MAX: 100,					// maximum value of a point
		UPDATE_INTERVAL: 20			// interval between points update (ms)
	}
};

var points;
var bonus1;
var bonus2;
var bonus3;

function getRandom(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}

function mutate1(num){
	if (num>0){
		return 50;
	} else if(num<0){
		return -50;
	} else {
		return 0;
	}
}

function mutate2(num){
	if (num>80 || num<-80){
		return num;
	} else {
		return 0;
	}
}

function initPoints() {
	points = [];
	for (var pointIndex = 0; pointIndex < CONFIG.POINTS.QTY; pointIndex++) {
		points[pointIndex] = getRandom(CONFIG.POINTS.MIN, CONFIG.POINTS.MAX);
	}
}

function initBonus1() {
	bonus1 = [];
	for (var pointIndex = 0; pointIndex < CONFIG.POINTS.QTY; pointIndex++) {
		bonus1[pointIndex] = mutate1(getRandom(CONFIG.POINTS.MIN, CONFIG.POINTS.MAX));
	}
}

function initBonus2() {
	bonus2 = [];
	for (var pointIndex = 0; pointIndex < CONFIG.POINTS.QTY; pointIndex++) {
		bonus2[pointIndex] = mutate2(getRandom(CONFIG.POINTS.MIN, CONFIG.POINTS.MAX));
	}
}

function initBonus3() {
	bonus3 = [];
	for (var pointIndex = 0; pointIndex < CONFIG.POINTS.QTY; pointIndex++) {
		bonus3[pointIndex] = getRandom(CONFIG.POINTS.MIN, CONFIG.POINTS.MAX)/2;
	}
}

function updatePoints() {
	points.shift();
	points.push(getRandom(CONFIG.POINTS.MIN, CONFIG.POINTS.MAX));
}

function updateBonus1() {
	bonus1.shift();
	bonus1.push(mutate1(getRandom(CONFIG.POINTS.MIN, CONFIG.POINTS.MAX)));
}

function updateBonus2() {
	bonus2.shift();
	bonus2.push(mutate2(getRandom(CONFIG.POINTS.MIN, CONFIG.POINTS.MAX)));
}

function updateBonus3() {
	bonus3.shift();
	bonus3.push(getRandom(CONFIG.POINTS.MIN, CONFIG.POINTS.MAX)/2);
}

initPoints();
setInterval(updatePoints, CONFIG.POINTS.UPDATE_INTERVAL);
initBonus1();
setInterval(updateBonus1, CONFIG.POINTS.UPDATE_INTERVAL);
initBonus2();
setInterval(updateBonus2, CONFIG.POINTS.UPDATE_INTERVAL);
initBonus3();
setInterval(updateBonus3, CONFIG.POINTS.UPDATE_INTERVAL);

app.use(express.static('public'));

app.get('/api/v1/config', function (req, res) {
	res.json(CONFIG);
});

app.get('/api/v1/points', function (req, res) {
	res.json(points);
});

app.get('/api/v1/bonus1', function (req, res) {
	res.json(bonus1);
});

app.get('/api/v1/bonus2', function (req, res) {
	res.json(bonus2);
});

app.get('/api/v1/bonus3', function (req, res) {
	res.json(bonus3);
});

app.get('/', function (req, res) {
	res.sendFile(process.cwd()+"/public/index.html");
});

app.get('/bonus', function (req, res) {
	res.sendFile(process.cwd()+"/public/bonus.html");
});

app.listen(3000, function () {
	console.log('listening on port 3000');
});
