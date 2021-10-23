const initialState = {
    isLoading: false,
}

const LoadingReducer = (state = initialState, action) => {
    switch (action.type) {

    case 'DISPLAY_LOADING': {
        console.log("vào case DISPLAY_LOADING");
        state.isLoading = true;
        return { ...state};

    }
  

    case 'HIDE_LOADING': {
        console.log("vào case HIDE_LOADING");
        state.isLoading = false;
        return {...state};
        
    }


    default:
        return {...state};
    }
}


export default LoadingReducer;