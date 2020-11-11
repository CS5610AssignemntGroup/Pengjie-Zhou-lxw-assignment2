import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { inputFrequency } from '../../actions';

class Frequency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            frequency: 100,
        };
    }

    handleFrequencyChange = e => {
        this.setState({ frequency: parseInt(e.target.value) });
    };

    handleFrequencySubmit = e => {
        let frequency = this.state.frequency;
        if (frequency < 50 || frequency > 2000) {
            alert('Frequency should be set between 50ms and 2000ms');
            this.setState({ frequency: 100 });
        }
        this.props.inputFrequency(frequency);
        e.preventDefault();
    };

    render() {
        return (
            <form onSubmit={this.handleFrequencySubmit}>
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
        );
    }
}

Frequency.propTypes = {
    inputFrequency: PropTypes.func,
};

const mapStateToProps = state => {
    return {
        frequency: state.frequency,
    };
};

export default connect(mapStateToProps, { inputFrequency })(Frequency);
