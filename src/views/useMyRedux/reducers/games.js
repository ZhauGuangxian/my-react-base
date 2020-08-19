const InitState = {
    gameCount: 1,
    gameList: []
};

export default function(state, action) {
    if (!state) {
        state = InitState;
    }
    const copyState = { ...state };
    switch (action.type) {
        case 'GAMEINCREMENT':
            copyState.gameCount++;
            break;
        case 'GAMEDECREMENT':
            copyState.gameCount--;
            break;
        default:
            break;
    }
    return copyState;
}
