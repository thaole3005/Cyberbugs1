const initialState = {
    projectList: [
        { 
            "id": 1385,
            "projectName": "todoList project",
            "description": "<p>This is todoList project</p>",
        },
    ],

    //arrProject cho dropdown
    arrProject: [],
}

const ProjectCyberBugsReducer = (state = initialState, action) => {
    switch (action.type) {

    //!get mảng projectList gồm các project cho trang projectmanagement
    case 'GET_PROJECT_LIST': {
        // console.log("action.projectList", action.projectList);
        state.projectList = action.projectList;
        return { ...state };
    }



    //!HIỂN THỊ rac các options gồm các project ở trong mảng arrProject cho DROPDOWN
    case 'GET_ALL_PROJECT': {
        console.log("vào case GET_ALL_PROJECT");
        state.arrProject = action.arrProject;
        return { ...state };
    }


    default:
        return { ...state };

    }
}




export default ProjectCyberBugsReducer;