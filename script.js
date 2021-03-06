// let matrix = [];
// let side = 10;
// let grassArr = [];
// let grassEaterArr = [];
// let predatorArr = [];
// let predEaterArr = [];
// let godArr = [];

// function setup() {
//     matrixGenerator(70, 1000, 700, 1000, 1200, 100);
//     createCanvas(matrix[0].length * side, matrix.length * side);
//     background('grey');
//     frameRate(8);

//     noStroke()

//     function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, predEaterCount, godCount) {
//         for (let index = 0; index < matrixSize; index++) {
//             matrix[index] = [];
//             for (let i = 0; i < matrixSize; i++) {
//                 matrix[index][i] = 0;
//             }
//         }
//         for (let index = 0; index < grassCount; index++) {
//             let x = Math.floor(random(0, matrixSize));
//             let y = Math.floor(random(0, matrixSize));
//             matrix[y][x] = 1;
//         }
//         for (let index = 0; index < grassEaterCount; index++) {
//             let x = Math.floor(random(0, matrixSize));
//             let y = Math.floor(random(0, matrixSize));
//             matrix[y][x] = 2;
//         }
//         for (let index = 0; index < predatorCount; index++) {
//             let x = Math.floor(random(0, matrixSize));
//             let y = Math.floor(random(0, matrixSize));
//             matrix[y][x] = 3;
//         }
//         for (let index = 0; index < predEaterCount; index++) {
//             let x = Math.floor(random(0, matrixSize));
//             let y = Math.floor(random(0, matrixSize));
//             matrix[y][x] = 4;
//         }
//         for (let index = 0; index < godCount; index++) {
//             let x = Math.floor(random(0, matrixSize));
//             let y = Math.floor(random(0, matrixSize));
//             matrix[y][x] = 5;
//         }
//     }

//     for (let y = 0; y < matrix.length; y++) {
//         for (let x = 0; x < matrix[y].length; x++) {
//             if (matrix[y][x] == 1) {
//                 let grass = new Grass(x, y);
//                 grassArr.push(grass);
//             }
//             else if (matrix[y][x] == 2) {
//                 let grassEater = new GrassEater(x, y);
//                 grassEaterArr.push(grassEater);
//             }
//             else if (matrix[y][x] == 3) {
//                 let predator = new Predator(x, y);
//                 predatorArr.push(predator);
//             }
//             else if (matrix[y][x] == 4) {
//                 let predeater = new PredEater(x, y);
//                 predEaterArr.push(predeater);
//             }
//             else if (matrix[y][x] == 5) {
//                 let god = new God(x, y);
//                 godArr.push(god);
//             }
//         }
//     }

// }

// function draw() {

//     for (let y = 0; y < matrix.length; y++) {
//         const element = matrix[y];
//         for (let x = 0; x < element.length; x++) {

//             if (matrix[y][x] == 1) {
//                 fill('green')
//             }
//             else if (matrix[y][x] == 2) {
//                 fill('orange')
//             }
//             else if (matrix[y][x] == 3) {
//                 fill('red')
//             }
//             else if (matrix[y][x] == 4) {
//                 fill('blue')
//             }
//             else if (matrix[y][x] == 5) {
//                 fill('black')
//             }
//             else {
//                 fill('grey')
//             }
//             rect(x * side, y * side, side, side)
//         }
//     }
//     for (let index = 0; index < grassArr.length; index++) {
//         grassArr[index].mul();
//     }
//     for (let index = 0; index < grassEaterArr.length; index++) {
//         grassEaterArr[index].eat();
//     }
//     for (let index = 0; index < predatorArr.length; index++) {
//         predatorArr[index].eat();
//     }
//     for (let index = 0; index < predEaterArr.length; index++) {
//         predEaterArr[index].eat();
//     }
//     for (let index = 0; index < godArr.length; index++) {
//         godArr[index].eat();
//     }
// }
var sideLength = 30;
var numberOfSides = 20;

var socket = io();

function setup() {
    createCanvas(numberOfSides * sideLength, numberOfSides * sideLength);
    background('#acacac');
}

function drawMatrix(data) {
    var matrix = data.matrix;

    console.log(matrix);

}