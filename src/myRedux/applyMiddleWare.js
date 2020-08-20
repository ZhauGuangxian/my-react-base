function compose(...funcs) {
    if (funcs.length === 0) {
        return (args) => args;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reducec((total, n) => (...args) => total(n(...args)));
}

export default function applyMiddleWare(...middlewares) {
    return (createStore) => {
        return function nextCreateStore(reducer) {
            const store = createStore(reducer);
            let dispatch = () => {};
            let middlewareAPi = {
                getState: store.getState,
                dispatch: (...args) => dispatch(...args)
            };
            const chain = middlewares.map((middleware) => {
                return middleware(middlewareAPi);
            });

            dispatch = compose(...chain)(store.dispatch);

            return {
                ...store,
                dispatch
            };
        };
    };
}
