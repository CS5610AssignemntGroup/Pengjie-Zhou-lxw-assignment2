class Cell {
    constructor(isAlive, turnsLastAlive) {
        this._isAlive = isAlive;
        this._turnsLastAlive = turnsLastAlive;
    }

    get isAlive() {
        return this._isAlive;
    }

    get turnsLastAlive() {
        return this._turnsLastAlive;
    }

    set isAlive(alive) {
        this._isAlive = alive;
    }

    set turnsLastAlive(turns) {
        this._turnsLastAlive = turns;
    }
}

export default Cell;
