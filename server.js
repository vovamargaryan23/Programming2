var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');

let weather = 'winter';
var stats = [];
let matrix = [];
let side = 10;
let grassArr = [];
let grassEaterArr = [];
let predatorArr = [];
let predEaterArr = [];
let godArr = [];

app.use(express.static("."));

app.get('/', function (req, res) {
	res.redirect('index.html');
});

server.listen(3000);

io.on('connection', function (socket) {
	console.log('a user connected');

	socket.on('someEvent', function () {
		console.log('some event happened on server');
	});

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
}

function game() {
	draw();
	var data = {
		'matrix': matrix,
		'weater': weather
	};
	io.sockets.emit('matrixUpdate', data);

	saveStats();
}

function draw() {
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

setInterval(game, 1000);