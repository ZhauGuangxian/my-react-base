export default function combineReducer(reducers) {
    const reducerKeys = Object.keys(reducers);
    const nextReducers = [];
    for (let i = 0; i < reducerKeys.length; i++) {
        nextReducers.push(reducers[reducerKeys[i]]);
    }

    return function combintion(state, action) {
        const nextState = {};
        if (!state) {
            state = {};
        }
        for (let i = 0; i < reducerKeys.length; i++) {
            let key = reducerKeys[i];
            let currentReducer = nextReducers[i];
            let nextStateForKey = currentReducer(state[key], action);
            nextState[key] = nextStateForKey;
        }

        return nextState;
    };
}
