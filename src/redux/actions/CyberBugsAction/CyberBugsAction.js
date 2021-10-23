
import { USER_SIGNIN_CYBERBUGS_API } from './../../constants/Cyberbugs/Cyberbugs';



// export const signinCyberBugsAction = (email, password, history) => ({
    export const signinCyberBugsAction = (email, password) => ({
    type: USER_SIGNIN_CYBERBUGS_API,
    userLogin: {
        email: email,
        password: password,
        // history,
    }
})
