import React, { Component } from 'react';
import { connect } from 'react-redux';
import { inputSize } from '../../actions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: [0, 0],
        };
    }

    handleRowChange = e => {
        let newSize = this.state.size;
        newSize[0] = parseInt(e.target.value);
        this.setState({ size: newSize });
    };

    handleColumnChange = e => {
        let newSize = this.state.size;
        newSize[1] = parseInt(e.target.value);
        this.setState({ size: newSize });
    };

    handleSubmit = e => {
        let size = this.state.size;
        this.props.inputSize(size);

        if (size[0] < 10 || size[0] > 100 || size[1] < 10 || size[1] > 100) {
            alert('Please make sure the size is between 10 * 10 and 100 * 100');
        } else {
            e.preventDefault();
            this.props.history.push('/game');
        }
    };

    render() {
        return (
            <div className="home">
                <br />
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <h3>Welcome to Conway's Game of Life </h3>
                <br />
                <h4>Please customize the board size: </h4>
                <h6>(size minimum 10 x 10, maximum 100 x 100) </h6>
                <form onSubmit={this.handleSubmit}>
                    <label className="label">
                        Rows:{' '}
                        <input
                            className="input"
                            type="text"
                            value={this.state.size[0]}
                            onChange={this.handleRowChange}
                        />
                    </label>
                    <label className="label">
                        Columns:{' '}
                        <input
                            className="input"
                            type="text"
                            value={this.state.size[1]}
                            onChange={this.handleColumnChange}
                        />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

Home.propTypes = {
    inputSize: PropTypes.func,
    history: PropTypes.object,
};

const mapStateToProps = state => {
    return {
        size: state.size,
        frequency: state.frequency,
    };
};

export default connect(mapStateToProps, { inputSize })(withRouter(Home));
