var side = 30;
var numberOfSides = 20;
var matrix = [];
var socket = io();
var weather;


socket.on('matrixUpdate', drawMatrix);

function setup() {
    createCanvas(numberOfSides * side, numberOfSides * side);
    background('grey');
    frameRate(10);
    noStroke();
}

function draw() {
    for (let y = 0; y < matrix.length; y++) {
        const element = matrix[y];
        for (let x = 0; x < element.length; x++) {
            //Ձմեռ
            if (frameCount % 40 > 0 && frameCount % 40 <= 10) {
                weather = 'winter'
                if (matrix[y][x] == 1) {
                    fill('rgb(222, 222, 222)')
                }
                else if (matrix[y][x] == 2) {
                    fill('orange')
                }
                else if (matrix[y][x] == 3) {
                    fill('red')
                }
                else if (matrix[y][x] == 4) {
                    fill('blue')
                }
                else if (matrix[y][x] == 5) {
                    fill('black')
                }
                else {
                    fill('grey')
                }
                document.getElementById('weather').innerHTML = 'The Weather is: ' + weather;
            }
            //Գարուն
            else if (frameCount % 40 > 10 && frameCount % 40 <= 20) {
                weather = 'spring'
                if (matrix[y][x] == 1) {
                    fill('green')
                }
                else if (matrix[y][x] == 2) {
                    fill('orange')
                }
                else if (matrix[y][x] == 3) {
                    fill('red')
                }
                else if (matrix[y][x] == 4) {
                    fill('blue')
                }
                else if (matrix[y][x] == 5) {
                    fill('black')
                }
                else {
                    fill('grey')
                }
                document.getElementById('weather').innerHTML = 'The Weather is: ' + weather;
            }
            //Ամառ
            else if (frameCount % 40 > 20 && frameCount % 40 <= 30) {
                weather = 'summer'
                if (matrix[y][x] == 1) {
                    fill('green')
                }
                else if (matrix[y][x] == 2) {
                    fill('orange')
                }
                else if (matrix[y][x] == 3) {
                    fill('red')
                }
                else if (matrix[y][x] == 4) {
                    fill('blue')
                }
                else if (matrix[y][x] == 5) {
                    fill('black')
                }
                else {
                    fill('grey')
                }
                document.getElementById('weather').innerHTML = 'The Weather is: ' + weather;
            }
            //Աշուն
            else if (frameCount % 40 > 30 && frameCount % 40 <= 40) {
                weather = 'autumn'
                if (matrix[y][x] == 1) {
                    fill('rgb(191, 83, 0)')
                }
                else if (matrix[y][x] == 2) {
                    fill('orange')
                }
                else if (matrix[y][x] == 3) {
                    fill('red')
                }
                else if (matrix[y][x] == 4) {
                    fill('blue')
                }
                else if (matrix[y][x] == 5) {
                    fill('black')
                }
                else {
                    fill('grey')
                }
                document.getElementById('weather').innerHTML = 'The Weather is: ' + weather;
            }

            rect(x * side, y * side, side, side)
        }
    }
}

function drawMatrix(data) {
    matrix = data.matrix;
}

function someEvent() {
    socket.emit('someEvent');
}
