export const inputSize = size => {
    return {
        type: 'SIZE_INPUT',
        payload: size,
    };
};

export const inputFrequency = frequency => {
    return {
        type: 'FREQUENCY_INPUT',
        payload: frequency,
    };
};
