
//!rootReducer dùng để quản lí Reducer, rootSaga đc sử dụng để quản lí action, dụa vào action.type

//Nếu là action thường thì viết ở file TodoListAction.js
//* nếu là action return về 1 function thì viết ở rootSaga.js, vì file của saga thì chỉ nên quản lí những action trả về function


import Axios from 'axios';
import {fork, take, takeEvery,delay, takeLatest,call, put, all } from 'redux-saga/effects';
import * as TodoListSaga from './TodoListSaga';
import * as Cyberbugs from './CyberBugs/userCyberBugsSaga';
import * as ProjectCategorySaga from './CyberBugs/ProjectCyberbugsCategorySaga'
import {theoDoicreateProjectSaga, theoDoiGetProjectListSaga, theoDoiUpdateProjectSaga, theoDoiDeleteProjectSaga, theoDoiGetProjectDetailSaga, theoDoiGetAllProjectSaga} from './CyberBugs/ProjectSaga';
import * as TaskTypeSaga from './CyberBugs/TaskTypeSaga';
import {theoDoiGetAllPrioritySaga} from './CyberBugs/PrioritySaga';
import * as taskSaga from './CyberBugs/TaskSaga';
import * as statusSaga from './CyberBugs/StatusSaga';



//rootSaga giống như rootReducer, nhưng khác là tập hợp chứa action
export function * rootSaga() {
    console.log("rootSaga");
    //?hàm all dùng để gọi tất cả các action cùng 1 lúc, truyền vào 1 mảng các action cần theo dõi
    yield all([
        TodoListSaga.theoDoiActionGetTaskApi(),
        TodoListSaga.theoDoiActionAddTaskApi(),
        TodoListSaga.theoDoiActionDeleteTaskApi(),
        TodoListSaga.theoDoiActionDoneTaskApi(),
        TodoListSaga.theoDoiActionRejectTaskApi(),


        // dự án Cyberbugs
        Cyberbugs.theoDoiSigninCyberBugs(),
        ProjectCategorySaga.theoDoigetAllProjectCategory(),
        theoDoicreateProjectSaga(),
        theoDoiGetProjectListSaga(),
        theoDoiUpdateProjectSaga(),
        theoDoiDeleteProjectSaga(),
        Cyberbugs.theoDoiGetUser(),
        Cyberbugs.theoDoiAddUserProject(),
        Cyberbugs.theoDoiDeleteUserProject(),
        Cyberbugs.theoDoiGetUsersByIdProjectSaga(),
        theoDoiGetProjectDetailSaga(),
        theoDoiGetAllProjectSaga(),
        
        TaskTypeSaga.theoDoiGetAllProjectSaga(),
        theoDoiGetAllPrioritySaga(),
        
        //nghiệp vụ về task
        taskSaga.theoDoiCreateTaskSaga(),
        statusSaga.theoDoiGetAllStatusSaga(),








        

    ])

}