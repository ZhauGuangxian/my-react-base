

const State = {
    routeMeta: {
        title: '',
        path: '',
        showBack: false,
        hide: false,
        backTo: ''
    } 
}

export default function(state = State, action){
    const copyState = {...state}
    switch (action.type) {
        case 'SetRouteMeta':
            copyState.routeMeta = action.payload;
            break;
        default:
            break;
    }
    return copyState;
}