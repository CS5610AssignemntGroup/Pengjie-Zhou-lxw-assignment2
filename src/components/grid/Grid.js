import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Grid.css';

class Grid extends Component {
    render() {
        const { grid, columns, rows, onToggleCell } = this.props;
        // console.log('gridinGrid', grid);
        let display = grid.map((row, i) =>
            row.map((col, j) => (
                <div
                    className={`Cell ${grid[i][j] ? 'isActive' : ''}`}
                    onClick={e => onToggleCell(i, j)}
                    key={`${i}_${j}`}
                />
            ))
        );

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
