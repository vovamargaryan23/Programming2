var LivingCreature = require("./LivingCreature");
module.exports = class Grass extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.life = 0;
    }
    mul(x) {
        this.life += x;
        let newCell = getRandomArrayElement(this.chooseCell(0));
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