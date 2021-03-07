var LivingCreature = require("./LivingCreature");
module.exports = class God extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 100;
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
            [this.x + 3, this.y + 3]
        ];
    }
    mul() {
        let newCell = getRandomArrayElement(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let god = new God(x, y);
            godArr.push(god);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let index = 0; index < godArr.length; index++) {
            if (godArr[index].x == this.x && godArr[index].y == this.y) {
                godArr.splice(index, 1)
            }
        }
    }
    eat() {
        this.getNewDirections();
        let newCell = getRandomArrayElement(this.chooseCell(4));
        if (newCell) {
            this.energy += 35;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < predEaterArr.length; index++) {
                if (predEaterArr[index].x == x && predEaterArr[index].y == y) {
                    predEaterArr.splice(index, 1)
                }
            }

            if (this.energy > 120) {
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
            matrix[y][x] = 5;
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