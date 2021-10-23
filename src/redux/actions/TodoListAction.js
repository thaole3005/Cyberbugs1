import {GET_TASK_API} from '../constants/TodoListConstants';
import Axios from 'axios';
import  reduxThunk  from  'redux-thunk';





export const getTaskListApi = () => {
  console.log("hàm getTaskListApi")

  return async dispatch => {
    

    //? Xử lí thành công thì viết ở try, xử lí không thành công thì viết ở catch
    try {
      
      //await sẽ đợi  Axxios call api và trả về response, sau đó gán kqua response lấy đc vào biến response
        let response = await Axios({
          url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
          method: 'GET',
      });

      console.log("RESPONSE", response);
      console.log("DATA", response.data);

      if(response.status === 200) {
        dispatch({
                type: GET_TASK_API,
                taskList: response.data,
        })
      }

    } catch(errors) {
        console.log("ERRORS", errors.response.data);
    }
  }
}



export const addTaskApi = (taskName) => {
  return async dispatch => {
    
    try {

      //?await giúp chuyển hàm Axios từ hàm bất đồng bộ thành hàm đồng bộ
        let response = await Axios({
          url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
          method: 'POST',
          data: {taskName: taskName},  //gửi lên serve 1 task mới
      });


      //lệnh if phải đợi Axios chạy xong thì mới chạy
      if( response.status === 200) {
        dispatch(getTaskListApi());
      }
  
    } catch (errors) {
        console.log("ERRORS", errors.response.data)
    }
   






  // promise.then((response) => {
  //     // console.log("response", response);
  //     //?sau khi đưa dữ liệu thành công lên serve thì dispatch lại hàm getTaskListApi để lấy đc danh sách mới nhất
  //     dispatch(getTaskListApi());
  // })

  // promise.catch((errors) => {
  //     alert(errors.response.data);     //task name is already exists!
  // })
  }
}






export const addTaskDoneApi = (taskName) => {
    return dispatch => {
      let promise = Axios({
        url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
        method: 'PUT',
    })

    promise.then((response) => {
        console.log("response", response);
        //sau khi thêm task thành công thì dispatch lại hàm getTaskListApi để load lại task
        dispatch(getTaskListApi());

    });

    promise.catch((errors) => {
        console.log(errors.response.data); 
    })
    }
}









export const deleteTaskApi = (taskName) => {
  return dispatch => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: 'DELETE',
  })

  promise.then((response) => {
      console.log("response", response);
      //sau khi delete task thành công ở server thì dispatch lại hàm getTaskListApi để load lại task
      dispatch(getTaskListApi());

  });

  promise.catch((errors) => {
      console.log(errors.response.data); 
  })
  }
}








export const rejectTaskApi = (taskName) => {
    return dispatch => {
      let promise = Axios({
        url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
        method: 'PUT',
    })

    promise.then((response) => {
        console.log("response", response);
        //sau khi rejeect task thành công ở api thì dispatch lại hàm getTaskListApi để load lại task
        dispatch(getTaskListApi());

    });

    promise.catch((errors) => {
        console.log(errors.response.data); 
    })
    }
}

