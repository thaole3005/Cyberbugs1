import Axios from "axios";
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
import { USER_LOGIN_CYBERBUGS, USER_SIGNIN_CYBERBUGS_API } from "./../../constants/Cyberbugs/Cyberbugs";
import { cyberbugsService } from "./../../../services/CyberbugsService";
import { DISPLAY_LOADING, HIDE_LOADING } from "./../../constants/LoadingConst";
import {
  STATUS_CODE,
  TOKEN_CYBERBUGS,
  USERLOGIN_CYBERBUGS_STORAGE,
} from "./../../../util/constants/settingSystem";

import { history } from './../../../util/libs/history';
import { userService } from './../../../services/UserService';
import { GET_USERS_BY_ID_PROJECT_SAGA , GET_USERS_BY_ID_PROJECT} from './../../constants/Cyberbugs/UserConstant';



// import { GET_USER_BY_PROJECT_ID_SAGA , GET_USER_BY_PROJECT_ID} from './../../constants/Cyberbugs/UserConstant';




function* signInCyberBugs(action) {
  //action này chính là action đc gửi từ component lên
  // console.log("action in signInCyberBugs", action);

  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(2000); //! code ở phía trên yield delay sẽ thực hiện trong vòng 2s, sau đó code ở duois mới đc thực hiện ==> nghĩa là sẽ hiển thị loading trong vòng 2s

  //thực hiện call api
  try {
    const response = yield call(() => {
      return cyberbugsService.signinCyberbugs(action.userLogin);
    });
    // console.log("response", response);

    //nếu đăng nhập lần đầu thành công thì accesstoken VÀ thông tin người dùng lưu vào storage
    localStorage.setItem(TOKEN_CYBERBUGS, response.data.content.accessToken);
    localStorage.setItem(
      USERLOGIN_CYBERBUGS_STORAGE,
      JSON.stringify(response.data.content)
    );

    //và đẩy thông tin người dùng lên reduxStore dể những component nào biding dữ liệu thì sẽ lấy data từ reduxStore về
    yield put({
      type: USER_LOGIN_CYBERBUGS,
      userLogin: response.data.content,

    })


    //*nếu đăng nhập thành công thì chuyển sang trang home
    //?c1:
    // action.userLogin.history.push('/home');


    //?c2:
    //lấy history từ redux Store về để thực hiện chuyển trang
    // let history = yield select(state => state.HistoryReducer.history);
    // // console.log("history in SAGA", history);
    // history.push('/home');


    //?c3: dùng thư viện history phiên bản 4.10, lấy history đc truyền từ prop history ở component Router trong file index,js
    history.push('/home');



  } catch (error) {
    
    yield put({
      type: HIDE_LOADING,
    });
    alert("mật khẩu hoặc email không đúng");
    console.log("error", error.response.data);
  }

  //đăng nhập thành công or thất bại thì sau khi call api phải tắt loading
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSigninCyberBugs() {
  yield takeLatest(USER_SIGNIN_CYBERBUGS_API, signInCyberBugs);
}




//?-------NHIỆM VỤ GET USERLIST KHI NHẬP VÀO AUTOCOMPLETE--------------



//!hàm getUser lấy ra 1 mảng các đối tượng user có user.name chứa keyWord mà ng dùng nhập vào
function* getUserCyberbugsSaga(action) {
  //action này chính là action đc gửi từ component lên
  console.log("action in getUserCyberbugsSaga", action);
  // console.log("KEYWORD", action.keyWord);
 
  //thực hiện call api
  try {
    const response = yield call(() => {
      return userService.getUser(action.keyWord);
    });
    // console.log("data of getUser", response.data);
    //*push mảng member tìm đc khi ng dùng search lên redux Store
    yield put ({
      type: 'GET_USER_CYBERBUGS_SEARCH',
      userSearchList: response.data.content,
    })

  } catch (error) {
   
    console.log("error", error);
  }


}


export function* theoDoiGetUser() {
  yield takeLatest("GET_USER_CYBERBUGS_SAGA", getUserCyberbugsSaga);
}




//?-------NHIỆM VỤ THÊM USER VÀO PROJECT--------------


//!hàm getUser lấy ra 1 mảng các đối tượng user có user.name chứa keyWord mà ng dùng nhập vào
function* addUserProjectSaga(action) {
  //action này chính là action đc gửi từ component lên
  // console.log("action in signInCyberBugs", action);

 
  //thực hiện call api
  try {
    const response = yield call(() => {
      return userService.assignUserProject(action.userProject);
    });
    console.log("data of assignUserProject", response.data);
    //*gọi lại action saga load lại dự án
    yield put ({
      type: 'GET_PROJECT_LIST_SAGA',
    })

  } catch (error) {
   
    console.log("error", error);
  }


}


export function* theoDoiAddUserProject() {
  yield takeLatest("ADD_USER_PROJECT_SAGA", addUserProjectSaga);
}







//?-------NHIỆM VỤ DELTETE USER FROM PROJECT--------------


//!hàm getUser lấy ra 1 mảng các đối tượng user có user.name chứa keyWord mà ng dùng nhập vào
function* delteUserProjectSaga(action) {
  //action này chính là action đc gửi từ component lên
  console.log("action in delteUserProjectSaga", action);

 
  //thực hiện call api
  try {
    const response = yield call(() => {
      return userService.deleteUserProject(action.userProject);
    });
    console.log("data of deleteUserProject", response.data);
    //*gọi lại action saga load lại dự án
    yield put ({
      type: 'GET_PROJECT_LIST_SAGA',
    })

  } catch (error) {
   
    console.log("error", error);
  }


}


export function* theoDoiDeleteUserProject() {
  yield takeLatest("DELETE_USER_PROJECT_SAGA", delteUserProjectSaga);
}






//?-------NHIỆM VỤ GET USERS ASSIGNED BY ID PROJECT FROM PROJECT--------------

function* getUsersByIdProjectSaga(action) {
  //action này chính là action đc gửi từ component lên
  console.log("action in getUsersByIdProjectSaga", action);

 
  //thực hiện call api
  try {
    const{ data, status }  = yield call(() => {
      return userService.getUsersByProjectId(action.idProject);
    });
    console.log("DATA of getUsersByIdProjectSaga",data);
   
    //nếu lấy đc mảng users tương ứng vs project thì dispatch action lên redux
    if(status === STATUS_CODE.SUCCESS) { 
      yield put ({
        type: GET_USERS_BY_ID_PROJECT,
        arrUser: data.content,
      })
    }


  } catch (error) {
   
    console.log("error", error.response.data);
    if(error.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put ({
        type: GET_USERS_BY_ID_PROJECT,
        arrUser: [],
      })
    }
  }


}


export function* theoDoiGetUsersByIdProjectSaga() {
  yield takeLatest(GET_USERS_BY_ID_PROJECT_SAGA, getUsersByIdProjectSaga);
}


