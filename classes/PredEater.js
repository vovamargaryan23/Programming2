var LivingCreature = require("./LivingCreature");
module.exports = class PredEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 95;
    }
    mul() {
        let newCell = getRandomArrayElement(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let predeater = new PredEater(x, y);
            predEaterArr.push(predeater);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let index = 0; index < predEaterArr.length; index++) {
            if (predEaterArr[index].x == this.x && predEaterArr[index].y == this.y) {
                predEaterArr.splice(index, 1)
            }
        }
    }
    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2],
            [this.x + 3, this.y + 3],
            [this.x + 4, this.y + 4]
        ];
    }
    eat() {
        this.getNewDirections();
        let newCell = getRandomArrayElement(this.chooseCell(3).concat(this.chooseCell(2)));
        if (newCell) {
            this.energy += 40;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < predatorArr.length; index++) {
                if (predatorArr[index].x == x && predatorArr[index].y == y) {
                    predatorArr.splice(index, 1)
                }
            }

            if (this.energy > 90) {
                this.mul()
            }
        }
        else { this.move() }
    }
    move() {
        this.energy--;
        let newCell = getRandomArrayElement(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (newCell && this.energy < 0) {
            this.die();
        }
        if (this.energy < 0) {
            this.die();
        }
    }
}