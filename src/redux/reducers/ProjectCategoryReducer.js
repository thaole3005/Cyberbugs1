import { GET_ALL_PROJECT_CATEGORY } from '../constants/Cyberbugs/Cyberbugs';


const initialState = {
    arrProjectCategory: [],
}

const ProjectCategoryReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_PROJECT_CATEGORY:
            state.arrProjectCategory = action.arrCategory;
            return { ...state}

        default:
            return {...state}
    }
}


export default ProjectCategoryReducer;