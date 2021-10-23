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
  import { cyberbugsService } from './../../../services/CyberbugsService';
import { STATUS_CODE } from './../../../util/constants/settingSystem';
import { GET_ALL_PROJECT_CATEGORY_SAGA, GET_ALL_PROJECT_CATEGORY } from './../../constants/Cyberbugs/Cyberbugs';




function * getAllProjectCategory(action) {
    // console.log("actionSaga", action);


    try {
        
        //gọi api bằng yield call, hàm call nhận vào 1 callback function mà trả về promise
        const {data, status} = yield call(() => {
            return cyberbugsService.getAllProjectCategory();
        });

        // console.log("data saga", data);
        
        if(status === STATUS_CODE.SUCCESS) {
            //gọi api thành công thì dispatch action thường chứa category lên redux Store
            yield put({
                type: GET_ALL_PROJECT_CATEGORY,
                arrCategory: data.content,
            })
        }

    } catch(err) {
        console.log("error", err.response.data);
    }


;}






export function* theoDoigetAllProjectCategory() {
    yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategory);
  }
  