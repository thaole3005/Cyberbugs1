

const historyState = {
    history: {}
};


export const HistoryReducer = (state = historyState, action) => {
    switch (action.type) {
        case 'ADD_HISTORY': {
            // console.log("action in HistoryReducer", action);
            state.history = action.history;
            return {...state};
        }
        default: {
            return {...state};
        }
    }
}