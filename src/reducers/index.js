import { combineReducers } from 'redux';

const inputSizeReducer = (size = null, action) => {
    if (action.type === 'SIZE_INPUT') {
        return action.payload;
    }

    return size;
};

const inputFrequencyReducer = (frequency = null, action) => {
    if (action.type === 'FREQUENCY_INPUT') {
        return action.payload;
    }

    return frequency;
};

export default combineReducers({
    size: inputSizeReducer,
    frequency: inputFrequencyReducer,
});
