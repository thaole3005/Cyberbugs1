import { GET_ALL_TAKSK_TYPE } from '../constants/Cyberbugs/TaskTypeConstant';

const initialState = {
    arrTaskType: [],
}

export const TaskTypeReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_TAKSK_TYPE: {
            state.arrTaskType = action.arrTaskType;
            return { ...state};
        }

        default: {
            return { ...state};
        }
    }
}
