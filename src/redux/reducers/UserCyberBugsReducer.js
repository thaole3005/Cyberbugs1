import { USERLOGIN_CYBERBUGS_STORAGE } from "../../util/constants/settingSystem";
import { USER_LOGIN_CYBERBUGS } from "../constants/Cyberbugs/Cyberbugs";
import { GET_USERS_BY_ID_PROJECT } from "../constants/Cyberbugs/UserConstant";

let userLogin = {};

//nếu đã có thông tin user ở localStorage rồi(đã từng đăng nhập rồi)
if(localStorage.getItem(USERLOGIN_CYBERBUGS_STORAGE)) {
    userLogin = JSON.parse(localStorage.getItem(USERLOGIN_CYBERBUGS_STORAGE));
}

const initialState = {
    userLogin: userLogin,
    userSearchList: [],   //Dùng để search khi thêm ng dùng (nghĩa là đây là mảng tất cả các user)
    arrUser: [],  //array user cho thẻ select (chỉ hiện thị mảng users gồm các user đc assign vào project tương ứng)
}

const UserCyberBugsReducer =  (state = initialState, action) => {
    switch (action.type) {

    case USER_LOGIN_CYBERBUGS: {
        // console.log("USER_LOGIN_CYBERBUGS ACTION", action.userLogin);
        state.userLogin = action.userLogin;
        return { ...state};
    }


    case 'GET_USER_CYBERBUGS_SEARCH' : {
        state.userSearchList = action.userSearchList;
        console.log("stateUser", state);

        return { ...state};
    }

    case GET_USERS_BY_ID_PROJECT: {
        return{...state, arrUser: action.arrUser};
    }


    default:
        return { ...state};
    }
}


export default UserCyberBugsReducer;