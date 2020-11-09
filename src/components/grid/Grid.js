import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Grid.css';

class Grid extends Component {
    render() {
        const { grid, columns, rows, onToggleCell } = this.props;
        let display = grid.map((row, j) =>
            row.map((col, i) => (
                <div
                    className={`Cell ${grid[i][j] ? 'isActive' : ''}`}
                    onClick={e => onToggleCell(i, j)}
                    key={`${i}_${j}`}
                />
            ))
        );

        // let percentColumns = 100 / columns + '%';
        // let percentRows = 100 / rows + '%';

        return (
            <div
                className="Grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 14px)`,
                    gridTemplateRows: `repeat(${rows}, 1fr)`,
                    // gridRowGap: '0px',
                    // gridColumnGap: '0px',
                    width: `${columns} * 15px`,
                    // textAlign: 'center',
                    // marginLeft: 'auto',
                    // marginRight: 'auto',
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
