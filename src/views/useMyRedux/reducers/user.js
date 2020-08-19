const InitState = {
    userCount: 1,
    userList: []
};

export default function(state, action) {
    if (!state) {
        state = InitState;
    }
    const copyState = { ...state };
    switch (action.type) {
        case 'USERINCREMENT':
            copyState.userCount++;
            break;
        case 'USERDECREMENT':
            copyState.userCount--;
            break;
        default:
            break;
    }
    return copyState;
}
