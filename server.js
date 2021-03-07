var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var Grass = require("./classes/Grass");
var GrassEater = require("./classes/GrassEater");
var Predator = require("./classes/Predator");
var PredEater = require("./classes/PredEater");
var God = require("./classes/God");

let weather = 'winter';
var stats = [];

matrix = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
predEaterArr = [];
godArr = [];

app.use(express.static("."));

app.get('/', function (req, res) {
	res.redirect('index.html');
});

server.listen(3000);

io.on('connection', function (socket) {
	console.log('a user connected');

	socket.on('someEvent', mutation);
});

getRandomInt = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}

getRandomArrayElement = function (arr) {
	let randomIndex = Math.floor(Math.random() * arr.length);
	let randomElement = arr[randomIndex];
	return randomElement;
}

function start() {
	matrixGenerator(70, 1000, 700, 1000, 1200, 100);
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 1) {
				let grass = new Grass(x, y);
				grassArr.push(grass);
			}
			else if (matrix[y][x] == 2) {
				let grassEater = new GrassEater(x, y);
				grassEaterArr.push(grassEater);
			}
			else if (matrix[y][x] == 3) {
				let predator = new Predator(x, y);
				predatorArr.push(predator);
			}
			else if (matrix[y][x] == 4) {
				let predeater = new PredEater(x, y);
				predEaterArr.push(predeater);
			}
			else if (matrix[y][x] == 5) {
				let god = new God(x, y);
				godArr.push(god);
			}
		}
	}
}

function mutation() {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 2) {
				let predator = new Predator(x, y);
				let grassEater = new GrassEater(x, y);
				predatorArr.push(predator);
				grassEaterArr.push(grassEater);
			}
		}
	}

}

function game() {
	update();
	var data = {
		'matrix': matrix,
		'weater': weather
	};
	io.sockets.emit('matrixUpdate', data);

	saveStats();
}

function update() {
	for (let index = 0; index < grassArr.length; index++) {
		grassArr[index].mul();
	}
	for (let index = 0; index < grassEaterArr.length; index++) {
		grassEaterArr[index].eat();
	}
	for (let index = 0; index < predatorArr.length; index++) {
		predatorArr[index].eat();
	}
	for (let index = 0; index < predEaterArr.length; index++) {
		predEaterArr[index].eat();
	}
	for (let index = 0; index < godArr.length; index++) {
		godArr[index].eat();
	}
}

function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, predEaterCount, godCount) {
	for (let index = 0; index < matrixSize; index++) {
		matrix[index] = [];
		for (let i = 0; i < matrixSize; i++) {
			matrix[index][i] = 0;
		}
	}
	for (let index = 0; index < grassCount; index++) {
		let x = getRandomInt(0, matrixSize);
		let y = getRandomInt(0, matrixSize);
		matrix[y][x] = 1;
	}
	for (let index = 0; index < grassEaterCount; index++) {
		let x = getRandomInt(0, matrixSize);
		let y = getRandomInt(0, matrixSize);
		matrix[y][x] = 2;
	}
	for (let index = 0; index < predatorCount; index++) {
		let x = getRandomInt(0, matrixSize);
		let y = getRandomInt(0, matrixSize);
		matrix[y][x] = 3;
	}
	for (let index = 0; index < predEaterCount; index++) {
		let x = getRandomInt(0, matrixSize);
		let y = getRandomInt(0, matrixSize);
		matrix[y][x] = 4;
	}
	for (let index = 0; index < godCount; index++) {
		let x = getRandomInt(0, matrixSize);
		let y = getRandomInt(0, matrixSize);
		matrix[y][x] = 5;
	}
}

function saveStats() {
	var fileName = 'stats.json';
	var statsObject = {
		'grassCount': grassArr.length,
		'grassEaterCount': grassEaterArr.length,
		'predatorCount': predatorArr.length,
		'predEaterCount': predEaterArr.length,
		'GodCount': godArr.length
	};

	stats.push(statsObject);
	fs.writeFileSync(fileName, JSON.stringify(stats, null, 4));
}

start();

setInterval(game, 100);