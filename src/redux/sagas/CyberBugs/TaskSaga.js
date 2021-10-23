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
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from './../../../util/constants/settingSystem';
import { DISPLAY_LOADING, HIDE_LOADING } from "./../../constants/LoadingConst";
import { notifiFunction } from './../../../util/Notification/notificationCyberbugs';


// -----------------------NHIỆM VỤ CREATE TASK CỦA PROJECT-------------------

function *createTaskSaga (action) {
    console.log("vào generator Func createTaskSaga");

    yield put({
        type: DISPLAY_LOADING,
      });
    
      yield delay(2000);

    try{
        const {data, status} = yield call (() => taskService.createTask(action.taskObject))

        if(status === STATUS_CODE.SUCCESS) {
            //Nếu call api tạo task thành công
            //Đóng form createTask
            yield put({
                type: 'CLOSE_DRAWER',
            });

             //hiển thị notification của antdesign là đã tạo task thành công 
            notifiFunction("success", "Create Task Successfully");

        }

    } catch(error){
        console.log("error", error.response.data);
    }

        //call api thành công or thất bại thi đều tắt loading
        yield put({
            type: HIDE_LOADING,
          });
}


export function* theoDoiCreateTaskSaga() {
    yield takeLatest('CREATE_TASK_SAGA', createTaskSaga);
  }
  
  