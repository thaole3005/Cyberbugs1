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
import { statusService } from "../../../services/StatusService";
import { GET_ALL_STATUS, GET_ALL_STATUS_SAGA } from './../../constants/Cyberbugs/StatusConstant';


// -----------------------NHIỆM VỤ GET ALL PROJECT TYPE-------------------

function *getAllStatusSaga (action) {
    console.log("vào generator Func getAllStatusSaga");
    try{
        const {data, status} = yield call (() => statusService.getAllStatus())
        yield put ({
            type: GET_ALL_STATUS,
            arrStatus: data.content,
        })
   
    } catch(error){
        console.log("error", error.response?.data);
    }
}


export function* theoDoiGetAllStatusSaga() {
    yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
  }
  
  