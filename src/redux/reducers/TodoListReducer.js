import {GET_TASK_API, } from '../constants/TodoListConstants';


const initialState = {
    taskList: [],
}

export const TodoListReducer =(state = initialState, action) => {
    switch (action.type) {

    case GET_TASK_API: {
        console.log("ACTION in reducer", action)
        state.taskList = action.taskList;

        return {...state};

    }

    default:
        return {...state};
    }
}


