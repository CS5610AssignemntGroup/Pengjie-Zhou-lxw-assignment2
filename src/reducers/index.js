import { combineReducers } from 'redux';

const inputSizeReducer = (size = null, action) => {
    if (action.type === 'SIZE_INPUT') {
        return action.payload;
    }

    return size;
};

export default combineReducers({
    size: inputSizeReducer,
});
