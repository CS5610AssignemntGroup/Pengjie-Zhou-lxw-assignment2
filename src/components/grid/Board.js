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
            intervalId: 0,
            generation: 0,
        };
        console.log('state', this.state);
    }

    componentDidMount() {
        this.reset();
    }

    makeGrid = () => {
        const { columns, rows } = this.state;
        let grid = new Array(columns);
        for (let i = 0; i < grid.length; i++) {
            grid[i] = new Array(rows);
        }
        return grid;
    };

    step = () => {
        let next = this.makeGrid();
        const { grid, columns, rows, generation } = this.state;

        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                let neighbors = this.count(grid, i, j);

                if (state === 0 && neighbors === 3) {
                    next[i][j] = 1;
                } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            }
        }
        this.setState({ grid: next, generation: generation + 1 });
    };

    count = (grid, x, y) => {
        const { columns, rows } = this.state;
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + columns) % columns;
                let row = (y + j + rows) % rows;

                sum += grid[col][row];
            }
        }

        sum -= grid[x][y];
        return sum;
    };

    seed = () => {
        const { columns, rows, grid } = this.state;
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = Math.round(Math.random());
            }
        }
        this.setState({ grid });
    };

    play = () => {
        clearInterval(this.state.intervalId);
        const intervalId = setInterval(this.step, 100);
        this.setState({ intervalId });
    };

    pause = () => {
        clearInterval(this.state.intervalId);
    };

    reset = () => {
        const { columns, rows } = this.state;
        let grid = this.makeGrid();
        for (let i = 0; i < columns; i++) {
            for (let j = 0; j < rows; j++) {
                grid[i][j] = 0;
            }
        }
        this.setState({ grid, generation: 0 });
    };

    toggleCell = (x, y) => {
        const { grid } = this.state;
        grid[x][y] = grid[x][y] ? 0 : 1;
        this.setState({ grid });
    };

    render() {
        const { grid, columns, rows, generation } = this.state;
        return (
            <div style={{ textAlign: 'center' }}>
                <button onClick={this.step}>Step</button>
                <button onClick={this.seed}>Randomize</button>
                <button onClick={this.play}>Play</button>
                <button onClick={this.pause}>Pause</button>
                <button onClick={this.reset}>Reset</button>
                {/*{console.log(grid)}*/}
                <Grid
                    grid={grid}
                    columns={columns}
                    rows={rows}
                    onToggleCell={this.toggleCell}
                />
                <p>Generation: {generation}</p>
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
