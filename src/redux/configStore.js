
import { applyMiddleware, combineReducers, createStore } from "redux";
import {TodoListReducer} from './reducers/TodoListReducer';
import LoadingReducer from './reducers/LoadingReducer';
import { HistoryReducer } from './reducers/HistoryReducer';


import  reduxThunk  from  'redux-thunk';

//cấu hình middleware saga
import {rootSaga} from './sagas/rootSaga';  //import generator function rootSaga
import createMiddleWareSaga from 'redux-saga'; //hàm tạo ra middleWare của sagaa
import UserCyberBugsReducer from './reducers/UserCyberBugsReducer';
import ProjectCategoryReducer from './reducers/ProjectCategoryReducer';
import ProjectCyberBugsReducer from './reducers/ProjectCyberBugsReducer';
import DrawerCyberbugsReducer from './reducers/DrawerCyberbugsReducer';
import ProjectReducer from './reducers/ProjectReducer';
import { TaskTypeReducer } from './reducers/TaskTypeReducer';
import { PriorityReducer } from './reducers/PriorityReducer';
import { StatusReducer } from './reducers/StatusReducer';


//thực thi hàm createMiddleWareSaga để tao ra đối tượng middleWareSaga
const middleWareSaga = createMiddleWareSaga();


//rootReducer là reducer tổng, truyền vào hàm combineReducers các reducer con
const rootReducer = combineReducers({
    TodoListReducer:TodoListReducer,
    LoadingReducer: LoadingReducer,
    HistoryReducer:HistoryReducer,
    UserCyberBugsReducer: UserCyberBugsReducer,
    ProjectCategoryReducer: ProjectCategoryReducer,
    ProjectCyberBugsReducer,
    DrawerCyberbugsReducer,
    ProjectReducer,
    TaskTypeReducer,
    PriorityReducer,
    StatusReducer,
})


//! 1 ứng dụng có thể sử dụng nhiều middleWare
const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));


//gọi Saga
//? gọi hàm run của đối tượng middleWareSaga, phương thức run nhận vào 1 rootSaga(là 1 generation function)
//* hàm run đc gọi và nó sẽ thực thi hàm generator function rootSaga
middleWareSaga.run(rootSaga)






export default store;