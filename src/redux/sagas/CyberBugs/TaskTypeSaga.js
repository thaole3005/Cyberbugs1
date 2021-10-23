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
import { GET_ALL_TAKSK_TYPE } from "../../constants/Cyberbugs/TaskTypeConstant";
import { GET_ALL_TAKSK_TYPE_SAGA } from './../../constants/Cyberbugs/TaskTypeConstant';


// -----------------------NHIỆM VỤ GET ALL PROJECT TYPE-------------------

function *getAllTaskTypeSaga (action) {
    console.log("vào generator Func getAllTaskTypeSaga");
    try{
        const {data, status} = yield call (() => taskTypeService.getAllTaskType())

        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_ALL_TAKSK_TYPE,
                arrTaskType: data.content,
            })
        }

    } catch(error){
        console.log("error", error);
    }
}


export function* theoDoiGetAllProjectSaga() {
    yield takeLatest(GET_ALL_TAKSK_TYPE_SAGA, getAllTaskTypeSaga);
  }
  
  