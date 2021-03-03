class LivingCreature {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }

    chooseCell(char) {
        let arr = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char) {
                    arr.push(this.directions[i]);
                }
            }
        }
        return arr;
    }
}

class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.life = 0;
        super.chooseCell(char);
    }
    mul() {
        this.life++;
        let newCell = random(this.chooseCell(0));
        if (newCell && this.life > 3) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            let grass = new Grass(x, y);
            grassArr.push(grass);
            this.life = 0;
        }
    }
}

class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 30;
    }
    mul() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
            let grassEater = new GrassEater(x, y);
            grassEaterArr.push(grassEater);
            this.energy = 0;
        }
    }
    eat() {
        this.getNewDirections();
        let newCell = random(this.chooseCell(1));
        if (newCell) {
            this.energy += 5;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < grassArr.length; index++) {
                if (grassArr[index].x == x && grassArr[index].y == y) {
                    grassArr.splice(index, 1)
                }
            }

            if (this.energy > 60) {
                this.mul()
            }
        }
        else { this.move() }
    }
    move() {
        this.energy--;
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 2;
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

class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 50;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 2]
            [this.x + 3, this, y + 3]
        ];
        super.chooseCell(char);
    }
    mul() {
        let newCell = random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            let predator = new Predator(x, y);
            predatorArr.push(predator);
            this.energy = 0;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let index = 0; index < predatorArr.length; index++) {
            if (predatorArr[index].x == this.x && predatorArr[index].y == this.y) {
                predatorArr.splice(index, 1)
            }
        }
    }
    eat() {
        this.getNewDirections();
        let newCell = random(this.chooseCell(2));
        if (newCell) {
            this.energy += 20;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let index = 0; index < grassEaterArr.length; index++) {
                if (grassEaterArr[index].x == x && grassEaterArr[index].y == y) {
                    grassEaterArr.splice(index, 1)
                }
            }

            if (this.energy > 50) {
                this.mul()
            }
        }
        else { this.move() }
    }
    move() {
        this.energy--;
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 3;
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

class PredEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 95;
        super.chooseCell(char);
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this, y + 2],
            [this.x + 3, this, y + 3],
            [this.x + 4, this.y + 4]
        ];
    }
    mul() {
        let newCell = random(this.chooseCell(0));
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
    eat() {
        this.getNewDirections();
        let newCell = random(this.chooseCell(3).concat(this.chooseCell(2)));
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
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
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

class God extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 100;
        super.chooseCell(char);
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this, y + 2],
            [this.x + 3, this, y + 3]
        ];
    }
    mul() {
        let newCell = random(this.chooseCell(0));
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
        let newCell = random(this.chooseCell(4));
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
        let newCell = random(this.chooseCell(0).concat(this.chooseCell(1)));
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