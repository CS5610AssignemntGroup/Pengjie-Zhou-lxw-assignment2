import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Cell from './Cell';
import Frequency from './Frequency';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rows: props.size ? props.size[0] : 10,
            columns: props.size ? props.size[1] : 20,
            grid: [],
            intervalId: 0,
            generation: 0,
            livingCells: 0,
            displayHeatmap: 0,
        };
    }

    componentDidMount() {
        this.reset();
        // // const { grid } = this.state;
        // // console.log('after mount', grid);
        // // this.seed();
        // this.test();
    }

    // test() {
    //     const { grid } = this.state;
    //     console.log('test', grid);
    // }

    makeGrid = () => {
        const { columns, rows } = this.state;
        let grid = new Array(rows);
        for (let i = 0; i < rows; i++) {
            grid[i] = new Array(columns);
        }
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                grid[i][j] = new Cell(0, 9);
            }
        }
        // console.log('after make grid', grid);
        return grid;
    };

    updateLivingCells = () => {
        const { rows, columns, grid } = this.state;
        let count = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                count += grid[i][j].isAlive;
            }
        }
        this.setState({ livingCells: count });
    };

    step = () => {
        let next = this.makeGrid();
        const { grid, columns, rows, generation, livingCells } = this.state;
        let newLivingCells = livingCells;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let neighbors = this.countNeighbors(grid, i, j);
                // debugger;
                if (grid[i][j].isAlive === 0) {
                    if (neighbors === 3) {
                        next[i][j].isAlive = 1;
                        next[i][j].turnsLastAlive = 0;
                        newLivingCells += 1;
                    } else {
                        next[i][j].isAlive = grid[i][j].isAlive;
                        next[i][j].turnsLastAlive =
                            grid[i][j].turnsLastAlive + 1;
                    }
                } else if (
                    grid[i][j].isAlive === 1 &&
                    (neighbors < 2 || neighbors > 3)
                ) {
                    next[i][j].isAlive = 0;
                    next[i][j].turnsLastAlive = 1;
                    newLivingCells -= 1;
                } else {
                    next[i][j].isAlive = grid[i][j].isAlive;
                    next[i][j].turnsLastAlive = grid[i][j].turnsLastAlive + 1;
                }
            }
        }
        this.setState({
            grid: next,
            generation: generation + 1,
            livingCells: newLivingCells,
        });
    };

    countNeighbors = (grid, x, y) => {
        const { columns, rows } = this.state;
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let newRow = x + i;
                let newCol = y + j;
                if (
                    newRow >= 0 &&
                    newRow < rows &&
                    newCol >= 0 &&
                    newCol < columns
                ) {
                    sum += grid[newRow][newCol].isAlive;
                }
            }
        }

        sum -= grid[x][y].isAlive;
        return sum;
    };

    seed = () => {
        const { columns, rows, grid } = this.state;
        // console.log('in seed', this.state.grid);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                grid[i][j].isAlive = Math.random() > 0.95 ? 1 : 0;
                grid[i][j].turnsLastAlive = grid[i][j].isAlive ? 0 : 9;
            }
        }

        this.setState({ grid });
        this.updateLivingCells();
    };

    start = () => {
        clearInterval(this.state.intervalId);
        const intervalId = setInterval(
            this.step,
            this.props.frequency ? this.prop.frequency : 100
        );
        this.setState({ intervalId });
    };

    pause = () => {
        clearInterval(this.state.intervalId);
    };

    reset = () => {
        let grid = this.makeGrid();
        // console.log('before reset', grid, this.state.grid);
        this.setState({ grid: grid, generation: 0, livingCells: 0 });
        // this.setState(state => {
        //     return { grid: grid, generation: 0, livingCells: 0 };
        // });
        //
        // this.setState(state => {
        //     return { grid: state.grid };
        // });
        // console.log('after reset', grid, this.state.grid);
    };

    toggleCell = (x, y) => {
        const { grid, livingCells } = this.state;
        let newLivingCells = livingCells;
        newLivingCells += grid[x][y].isAlive ? -1 : 1;
        grid[x][y].isAlive = grid[x][y].isAlive ? 0 : 1;
        grid[x][y].turnsLastAlive = grid[x][y].isAlive ? 0 : 9;
        this.setState({ grid, livingCells: newLivingCells });
    };

    toggleDisplay = () => {
        const { displayHeatmap } = this.state;
        let newDisplay = displayHeatmap === 0 ? 1 : 0;
        this.setState({ displayHeatmap: newDisplay });
    };

    render() {
        const {
            grid,
            columns,
            rows,
            generation,
            livingCells,
            displayHeatmap,
        } = this.state;
        return (
            <div style={{ textAlign: 'center' }}>
                <p>Living cells: {livingCells}</p>
                <p>Generation: {generation}</p>
                <button onClick={this.step}>Step</button>
                <button onClick={this.seed}>Randomize</button>
                <button onClick={this.start}>Start</button>
                <button onClick={this.pause}>Pause</button>
                <button onClick={this.reset}>Reset</button>
                <button onClick={this.toggleDisplay}>Change Display</button>
                <Frequency />
                <Grid
                    grid={grid}
                    columns={columns}
                    rows={rows}
                    onToggleCell={this.toggleCell}
                    displayHeatmap={displayHeatmap}
                />
            </div>
        );
    }
}

Board.propTypes = {
    size: PropTypes.array,
    frequency: PropTypes.number,
};

const mapStateToProps = state => {
    return {
        size: state.size,
        frequency: state.frequency,
    };
};

export default connect(mapStateToProps)(Board);
