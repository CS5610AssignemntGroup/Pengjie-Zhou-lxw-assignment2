import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from './Grid';
import PropTypes from 'prop-types';

class Board extends Component {
    constructor(props) {
        super(props);
        console.log('props', props);
        this.state = {
            rows: props.size[0],
            columns: props.size[1],
            grid: [],
            frequency: 100,
            intervalId: 0,
            generation: 0,
            livingCells: 0,
        };
        console.log('state', this.state);
    }

    componentDidMount() {
        this.reset();
    }

    makeGrid = () => {
        const { columns, rows } = this.state;
        let grid = new Array(rows);
        for (let i = 0; i < rows; i++) {
            grid[i] = new Array(columns);
        }
        return grid;
    };

    updateLivingCells = () => {
        const { rows, columns, grid } = this.state;
        let count = 0;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                count += grid[i][j];
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
                let state = grid[i][j];
                let neighbors = this.countNeighbors(grid, i, j);

                if (state === 0 && neighbors === 3) {
                    next[i][j] = 1;
                    newLivingCells += 1;
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                    newLivingCells -= 1;
                } else {
                    next[i][j] = state;
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
                let row = (x + i + rows) % rows;
                let col = (y + j + columns) % columns;

                sum += grid[row][col];
            }
        }

        sum -= grid[x][y];
        return sum;
    };

    seed = () => {
        const { columns, rows, grid } = this.state;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                grid[i][j] = Math.random() > 0.95 ? 1 : 0;
            }
        }

        this.setState({ grid });
        this.updateLivingCells();
    };

    start = () => {
        clearInterval(this.state.intervalId);
        const intervalId = setInterval(this.step, this.state.frequency);
        this.setState({ intervalId });
    };

    pause = () => {
        clearInterval(this.state.intervalId);
    };

    reset = () => {
        const { columns, rows } = this.state;
        let grid = this.makeGrid();
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                grid[i][j] = 0;
            }
        }
        this.setState({ grid, generation: 0, livingCells: 0 });
    };

    toggleCell = (x, y) => {
        const { grid, livingCells } = this.state;
        let newLivingCells = livingCells;
        newLivingCells += grid[x][y] ? -1 : 1;
        grid[x][y] = grid[x][y] ? 0 : 1;
        this.setState({ grid, livingCells: newLivingCells });
    };

    handleFrequencyChange = e => {
        this.setState({ frequency: e.target.value });
    };

    handleSubmit = e => {
        let frequency = this.state.frequency;
        if (frequency < 50 || frequency > 2000) {
            alert('Frequency should be set between 50ms and 2000ms');
            this.setState({ frequency: 100 });
        }
        e.preventDefault();
    };

    render() {
        const { grid, columns, rows, generation, livingCells } = this.state;
        return (
            <div style={{ textAlign: 'center' }}>
                <p>Living cells: {livingCells}</p>
                <p>Generation: {generation}</p>
                <button onClick={this.step}>Step</button>
                <button onClick={this.seed}>Randomize</button>
                <button onClick={this.start}>Start</button>
                <button onClick={this.pause}>Pause</button>
                <button onClick={this.reset}>Reset</button>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Frequency:
                        <input
                            type="number"
                            value={this.state.frequency}
                            onChange={this.handleFrequencyChange}
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {/*{console.log(grid)}*/}
                <Grid
                    grid={grid}
                    columns={columns}
                    rows={rows}
                    onToggleCell={this.toggleCell}
                />
            </div>
        );
    }
}

Board.propTypes = {
    size: PropTypes.array,
};

const mapStateToProps = state => {
    return {
        size: state.size,
    };
};

export default connect(mapStateToProps)(Board);
