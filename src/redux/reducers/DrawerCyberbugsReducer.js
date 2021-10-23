const initialState = {
    visible: false,
    titile: '',
    ComponentContentDrawer: <p>Default Content</p>,
    // ComponentContentDrawer: (props) => {
    //     console.log("props of ComponentContentDrawer", props);
    //     return <p>Default Content</p>
    // }

    
    callBackSubmit: (propsValue) => {
        alert('click demo');
    }
}

 const DrawerCyberbugsReducer = (state = initialState, action) => {
    switch (action.type) {

    case 'OPEN_DRAWER': {
        state.visible = true;
        return { ...state};
    }

    case 'CLOSE_DRAWER': {
        state.visible = false;
        return { ...state};
    }

    case 'OPEN_FORM_EDIT_PROJECT': {
        console.log("OPEN_FORM ACTION in DrawerReducer");
        state.visible = true;
        state.title = action.title;
        state.ComponentContentDrawer = action.Component;
        return { ...state};

    }

    case 'SET_SUBMIT_EDIT_PROJECT': {
        state.callBackSubmit = action.submitFunction;
        return { ...state};

    }

    case 'OPEN_FORM_CREATE_TASK': {
        state.visible = true;
        state.ComponentContentDrawer = action.Component;
        state.title = action.title;
        return { ...state};

    }


    case 'SET_SUBMIT_CREATE_TASK': {
        return {...state, callBackSubmit: action.submitFunction}

    }



    default:
        return state
    }
}


export default DrawerCyberbugsReducer;