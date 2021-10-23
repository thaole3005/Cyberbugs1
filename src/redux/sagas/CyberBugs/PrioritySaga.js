import {
    fork,
    take,
    takeEvery,
    delay,
    takeLatest,
    select,
    call,
    put,
  } from "redux-saga/effects";
import { STATUS_CODE } from './../../../util/constants/settingSystem';
import { taskTypeService } from './../../../services/TaskTypeService';
import { priorityService } from './../../../services/PriorityService';
import { GET_ALL_PRIORITY, GET_ALL_PRIORITY_SAGA } from './../../constants/Cyberbugs/PriorityConstant';


// -----------------------NHIỆM VỤ GET ALL PROJECT TYPE-------------------

function *getAllPrioritySaga (action) {
    console.log("vào generator Func getAllTaskTypeSaga");
    try{
        const {data, status} = yield call (() => priorityService.getAllTaskType())

        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_PRIORITY,
                arrPriority: data.content,
            })
        }

    } catch(error){
        console.log("error", error);
    }
}


export function* theoDoiGetAllPrioritySaga() {
    yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
  }
  
  