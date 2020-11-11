import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Grid.css';
import './Cell';

class Grid extends Component {
    render() {
        const {
            grid,
            columns,
            rows,
            onToggleCell,
            displayHeatmap,
        } = this.props;
        const colorArray = [
            '#000000',
            '#330000',
            '#800000',
            '#b30000',
            '#e60000',
            '#ff1a1a',
            '#ff4d4d',
            '#ff8080',
            '#ffcccc',
            '#ffffff',
        ];
        // console.log('gridinGrid', grid);
        let display = null;
        if (displayHeatmap) {
            display = grid.map((row, i) =>
                row.map((col, j) => (
                    <div
                        className={`Cell ${
                            grid[i][j].isAlive ? 'isActive' : ''
                        }`}
                        style={{
                            backgroundColor: `${
                                colorArray[grid[i][j].turnsLastAlive]
                            }`,
                        }}
                        onClick={e => onToggleCell(i, j)}
                        key={`${i}_${j}`}
                    />
                ))
            );
        } else {
            display = grid.map((row, i) =>
                row.map((col, j) => (
                    <div
                        className={`Cell ${
                            grid[i][j].isAlive ? 'isActive' : ''
                        }`}
                        onClick={e => onToggleCell(i, j)}
                        key={`${i}_${j}`}
                    />
                ))
            );
        }

        return (
            <div
                className="Grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 14px)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    width: `${columns} * 15px`,
                }}>
                {display}
            </div>
        );
    }
}

Grid.propTypes = {
    grid: PropTypes.array,
    columns: PropTypes.number,
    rows: PropTypes.number,
    onToggleCell: PropTypes.func,
};

export default Grid;
