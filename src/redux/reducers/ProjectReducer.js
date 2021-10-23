
const initialState = {
    projectEdit: {
        "id": 0,
        "projectName": "string",
        "creator": 0,
        "description": "<h1>jslv divh dfgs</h1>",
        "categoryId": 3
      },

      projectDetail: {
          
      },
}

const ProjectReducer = (state = initialState, action) => {
    console.log("vào PROJECT REDUCER")
    switch (action.type) {

    case 'EDIT_PROJECT': {
        state.projectEdit = action.projectEditModel;
        return { ...state};
    }

    
    case 'PUT_PROJECT_DETAIL' : {
        console.log("vào case PUT_PROJECT_DETAIL");
        state.projectDetail = action.projectDetail;
        return { ...state};
    }


    default:
        return { ...state};

    }
}


export default ProjectReducer;