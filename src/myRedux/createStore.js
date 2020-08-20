export default function createStore(reducer, enhancer) {
    if (typeof enhancer === 'function') {
        return enhancer(createStore)(reducer);
    }
    let listeners = [];
    let currentState = null;
    let currentReduce;

    function subscribe(cb) {
        if (listeners.indexOf(cb) === -1) {
            listeners.push(cb);
            return function() {
                let index = listeners.indexOf(cb);
                listeners.splice(index, 1);
            };
        }
    }

    function getState() {
        return currentState;
    }

    function dispatch(action) {
        const nextState = reducer(currentState, action);
        currentState = nextState;
        for (let i = 0; i < listeners.length; i++) {
            listeners[i]();
        }
        return action;
    }
    // 初始化一下
    dispatch({
        type: '$$INITSTATE'
    });
    return {
        subscribe,
        getState,
        dispatch
    };
}
