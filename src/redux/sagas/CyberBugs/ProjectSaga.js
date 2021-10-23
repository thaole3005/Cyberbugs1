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
import { DISPLAY_LOADING, HIDE_LOADING } from "./../../constants/LoadingConst";
import { GET_ALL_PROJECT_CATEGORY_SAGA, GET_ALL_PROJECT_CATEGORY } from './../../constants/Cyberbugs/Cyberbugs';
import { history } from './../../../util/libs/history';
import {projectService} from '../../../services/ProjectService';
import { notifiFunction } from './../../../util/Notification/notificationCyberbugs';
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from './../../constants/Cyberbugs/ProjectCyberBugsConstants';
import { GET_USERS_BY_ID_PROJECT_SAGA } from './../../constants/Cyberbugs/UserConstant';

// -----------------------NHIỆM VỤ GET TASK CATEGORY-------------------

function * createProjectSaga (action) {
  console.log("action createProjectSaga", action);

  yield put({
      type: DISPLAY_LOADING,
    });
  
  yield delay(2000);

  try {
      
      //gọi api bằng yield call, hàm call nhận vào 1 callback function mà trả về promise
      const {data, status} = yield call(() => {
          // return cyberbugsService.createProject(action.newProject);
          return cyberbugsService.createProjectAuthorization(action.newProject);
      });

      // console.log("data saga", data);
      
      if(status === STATUS_CODE.SUCCESS) {
         console.log("thành công rùi nè", data);
         //nếu thêm project thành công rồi thì chuyển hướng trang qua project management để xem all project
         history.push('/projectmanagement');
      }

  } catch(err) {
      console.log("error", err.response.data);
  }


  //call api thành công or thất bại thi đều tắt loading
  yield put({
      type: HIDE_LOADING,
    });

;}






export function* theoDoicreateProjectSaga() {
  yield takeLatest('CREATE_PROJECT_SAGA', createProjectSaga);
}






// -----------------------NHIỆM VỤ GET ALL TASK-------------------


function *getProjectListSaga(action) {
  console.log("action getProjectListSaga", action);

  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(2000);

  try {
    
    const {data, status} = yield call (() => {
      return cyberbugsService.getProjectList();
    });

    console.log("projectList", data);

    //nếu call api thành công lấy đc projectList thì push dữ liệu lên reduxStore
    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: 'GET_PROJECT_LIST',
        projectList: data.content,
      });

    }

  } catch (error) {
    console.log("error",error);
  }

     //call api thành công or thất bại thi đều tắt loading
     yield put({
      type: HIDE_LOADING,
    });

}



export function* theoDoiGetProjectListSaga() {
  yield takeLatest('GET_PROJECT_LIST_SAGA', getProjectListSaga);
}





// -----------------------NHIỆM VỤ UPDATE TASK-------------------


function *updateProjectSaga(action) {
  console.log("action getProjectListSaga", action);
  
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(2000);

  try {
    
    const {data, status} = yield call (() => {
      return cyberbugsService.updateProject(action.projectUpdate);
    });

    //nếu call api thành công lấy đc projectList thì push dữ liệu lên reduxStore
    if(status === STATUS_CODE.SUCCESS) {
      console.log("data in UPDATE_PROJECT_SAGA", data);
      //nếu đưa dữ liệu cần update lên serve thành công thì gọi lại getAllProjectlist để lấy về ProjectList mới

      //?c1: yield call ngoài call api thì có thể gọi lại những action saga, nhưng chỉ cần truyền vào yield call tên function generator cần thực hiện lại
      // yield call (getProjectListSaga);


      //!c2:( yield put đc dùng để gọi lại 1 action saga phổ biến hơn yield call)
      yield put({
        type: 'GET_PROJECT_LIST_SAGA',
      });

      //và đóng Editmodal
      yield put({
        type: 'CLOSE_DRAWER',
      });
    }

  } catch (error) {
    console.log("error",error);
  }

   //call api thành công or thất bại thi đều tắt loading
   yield put({
    type: HIDE_LOADING,
  });

}



export function* theoDoiUpdateProjectSaga() {
  yield takeLatest('UPDATE_PROJECT_SAGA', updateProjectSaga);
}







//? -----------------------NHIỆM VỤ DELETE PROJECT-------------------


function *deleteProjectSaga(action) {
  console.log("action deleteProjectSaga", action);

  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(2000);

  try {
    
    const {data, status} = yield call (() => {
      return projectService.deleteProject(action.idProject);
    });
    console.log("STATUS DELETE", status);

    if(status === STATUS_CODE.SUCCESS) {
      
      //hiển thị notification của antdesign là đã xóa thành công 
      notifiFunction("success", "Delete Successfully");
      
      
      //nếu call delete api thành công thì dispatch action saga để lấy về task list mới nhất
      yield put({
        type: 'GET_PROJECT_LIST',
        projectList: data.content,
      })
    } else {
       //nếu xáo k thành công thì hiển thị notification xóa không thành công
      notifiFunction("error", "Delete Fail");
    }
    
    
  } catch (error) {
    //nếu xáo k thành công thì hiển thị notification xóa không thành công
    notifiFunction("error", "Delete Fail");
    console.log("error",error);
  }

     //call api thành công or thất bại thi đều tắt loading
     yield put({
      type: HIDE_LOADING,
    });

}



export function* theoDoiDeleteProjectSaga() {
  yield takeLatest('DELETE_PROJECT_SAGA', deleteProjectSaga);
}




//? -----------------------NHIỆM VỤ GET PROJECT DETAIL-------------------


function *getProjectDetailSaga(action) {
  console.log("action getProjectDetailSaga", action);

  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(2000);

  try {
    
    const {data, status} = yield call (() => {
      return projectService.getProjectDetai(action.projectId);
    });

    console.log("DATA.CONTENT of getProjectDetailSaga", data.content);
    if(status === STATUS_CODE.SUCCESS) {
      //nếu call api lấy dữ liệu projectDetail thành công thì đưa dữ liệu lên redux
      yield put({
        type: 'PUT_PROJECT_DETAIL',
        projectDetail: data.content,
      })

      
      //hiển thị notification của antdesign là đã getProjectDetail thành công
      notifiFunction("success", "getProjectDetail Successfully");
      
    } else {
       //nếu getProjectDetail k thành công thì hiển thị notification không thành công
      notifiFunction("error", "getProjectDetail Fail");
   
    }
    
    
  } catch (error) {
    //nếu getProjectDetail k thành công thì hiển thị notification không thành công
    notifiFunction("error", "getProjectDetail Fail");
     //call api thành công or thất bại thi đều tắt loading
     yield put({
      type: HIDE_LOADING,
    });
    console.log("error",error.response.data);
    alert("404 not found");
    //chuyển về lại trang projectmanagetment
    history.push('/projectmanagement');

  }

     //call api thành công or thất bại thi đều tắt loading
     yield put({
      type: HIDE_LOADING,
    });

}



export function* theoDoiGetProjectDetailSaga() {
  yield takeLatest('GET_PROJECT_DETAIL_SAGA', getProjectDetailSaga);
}



//? -----------------------NHIỆM VỤ GET ALL PROJECT cho DROPDOWN (khi nhấn vào button Create  Task ở Sidebar)-------------------


function *getProjectAllSaga(action) {
  console.log("action getProjectAllSaga", action);

  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(2000);

  try {
    
    const {data, status} = yield call (() => {
      return projectService.getAllProject();
    });

    console.log("projectList", data);

    //nếu call api thành công lấy đc projectList thì push dữ liệu lên reduxStore
    if(status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT,
        arrProject: data.content,
      });

      //lấy về list user asigned cho project đầu tiên ở select Project Name (hiển thị mặc định lần đầu)
      yield put ({
        type: GET_USERS_BY_ID_PROJECT_SAGA,
        idProject: data.content[0].id,
      })
    }

  } catch (error) {
    console.log("error",error);
  }

     //call api thành công or thất bại thi đều tắt loading
     yield put({
      type: HIDE_LOADING,
    });

}



export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getProjectAllSaga);
}


