
import Axios from 'axios';
import {fork, take, takeEvery,delay, takeLatest,call, put } from 'redux-saga/effects';
import {GET_TASK_API} from '../constants/TodoListConstants';
import {todoListSer} from '../../services/TodoListServices';
import {STATUS_CODE} from '../../util/constants/settingSystem';
import {DISPLAY_LOADING, HIDE_LOADING} from '../constants/LoadingConst';
import {GET_TASKLIST_API, ADD_TASK_API, DELETE_TASK_API, DONE_TASK_API, REJECT_TASK_API} from '../constants/TodoListConstants';




//*----------------------------NHIỆM VỤ GETTASKLIST từ SERVER--------------------------------

//mỗi hàm generator function là 1 action ( trừ generator function rootSaga)
function * getTaskListApiAction(action) {

    console.log("getTaskListApiAction",action)
    
    
        //*mới vào thì hiển thị loading lên
        //? put của saga giống vs dispatch action, PUT có thể dispatch action saga lẫn action thường
        yield put({
            type: DISPLAY_LOADING,
        })

    try {
        //Hàm call thực thi theo cơ chế blocking. có nghĩa là sau khi promise trong tham số của hàm call trả về response, thì code ở phía dưới mới được thực thi
        let response = yield call( todoListSer.getTaskApi);
        
        yield delay(2000); //! code ở phía trên yield delay sẽ thực hiện trong vòng 2s, sau đó code ở duois mới đc thực hiện ==> nghĩa là sẽ hiển thị loading trong vòng 2s

        console.log("RESPONSE", response);
        if(response.status === STATUS_CODE.SUCCESS) {

            //*Sau khi lấy giá trị thành công, dùng hàm put(giống vs dispatch bên thunk) để đẩy taskList lấy đc từ serve lêm redux, những component vào useSelector từ redux sẽ cập nhật lại
            //! yield put có thể dispatch action thường hoặc action saga
            yield put({
                type: GET_TASK_API,
                taskList: response.data,
            })
    
            
        } else {
            console.log("ERROR")
        }
        
        
    } catch(error) {
        console.log("ERROR", error);
    }
    
    
    //*sau khi lấy đc taskList từ server, các component render lại từ dữu liệu mới của redux xong thì tắt isLoading
    yield put({
        type: HIDE_LOADING,
    })
}



//hàm theo dõi xem action nào đc dispatch lên có type là getTaskListApiAction thì thực hiện hàm xử lí action là getTaskListApiAction
export function* theoDoiActionGetTaskApi() {
    yield takeLatest(GET_TASKLIST_API, getTaskListApiAction); //?chỉ thực hiện action đc dispatch lần cuối cùng

}








//*----------------------------NHIỆM VỤ ADDTASK lên SERVER--------------------------------

function * addTaskApiAction (action) {
    console.log("addTaskApiAction", action);
    //gọi api và sau đó hiển thị loading ==> gọi lại hàm getTaskListApiAction để load lại danh sách taskList mới

    let {taskName} = action;

    try {

        let response =  yield call(() => {   //call back function thực hiện return về 1 promise
            return todoListSer.addTaskApi(taskName); 
        })

        console.log("RESPONSE", response);
        //?saui khi add task mới lên server thì gọi lại hàm getTaskListApiAction để get về danh sách mới
        if(response.status === STATUS_CODE.SUCCESS) {
            yield put ({
                type: GET_TASKLIST_API,
            })
        }
    } catch(error) {
        console.log("ERROR", error);
    }

    


}



export function * theoDoiActionAddTaskApi() {
    yield takeLatest(ADD_TASK_API, addTaskApiAction)
} 








//*----------------------------NHIỆM VỤ DELETETASK --------------------------------

function * deleteTaskApiAction(action) {
    //action này chính là action đc dispatch từ component lên
    let {taskName} = action;

    try {
        
        //*yield call có nhiệm vụ gọi api để deleteTask trên serve(nhận vào 1 function callback trả về 1 promise), sau khi yield call thực thi xong sẽ trả về RESPONSE 
        //dùng bóc tách phần tử để lấy ra taskName = response.taskName
        const { status} = yield call (() => {
            return todoListSer.deleteTaskApi(taskName);
        });

        //yield call thực hiện theo cơ chế blocking nên code ở dưới yield call chỉ đc thực hiện khi yield call deleteTask ở server thành công
        //Nếu thành công thì gọi lại action Saga
        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API,
            })
        }

    } catch (err) {
        console.log("ERROR", err);
    }





}




export function * theoDoiActionDeleteTaskApi() {
    yield takeLatest (DELETE_TASK_API, deleteTaskApiAction)
}







//*----------------------------NHIỆM VỤ DONETASK --------------------------------






function * doneTaskApiAction(action) {
    let {taskName} = action;

    try {
        const {status} = yield call(() => {
            return todoListSer.doneTaskApi(taskName)
        });

        if(status === STATUS_CODE.SUCCESS) {
            yield put({
                type: GET_TASKLIST_API,
            })
        }


    }catch(err) {
        console.log("ERROR", err)
    }




}




export function * theoDoiActionDoneTaskApi() {
    yield takeLatest (DONE_TASK_API, doneTaskApiAction)
}










//*----------------------------NHIỆM VỤ REJECTTASK --------------------------------









function * rejectTaskApiAction(action) {
    console.log("rejectTaskApiAction");

    let {taskName} = action;

    try {
        const {data, status} = yield call(() => todoListSer.rejectTaskApi(taskName));

        if(status === STATUS_CODE.SUCCESS) {
            yield put ({
                type: GET_TASKLIST_API,
            })
        }


    }catch(err) {
        console.log("ERROR", err);
    }



}




export function * theoDoiActionRejectTaskApi() {
    yield takeLatest (REJECT_TASK_API, rejectTaskApiAction)
}


