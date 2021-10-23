import Axios from 'axios';
import { DOMAIN_CYBERBUGS } from '../util/constants/settingSystem';
import { TOKEN_CYBERBUGS } from './../util/constants/settingSystem';


export const cyberbugsService = {
    signinCyberbugs: (userLogin) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/Users/signin`,
            method: 'POST',
            data: userLogin,
        })
    },
    getAllProjectCategory: () => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/ProjectCategory`,
            method: 'GET',
        })
    },
    createProject: (newProject) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/Project/createProject`,
            method: 'POST',
            data: newProject
        })
    },
    createProjectAuthorization: (newProject) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/Project/createProjectAuthorize`,
            method: 'POST',
            data: newProject,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_CYBERBUGS)}
        })
    },

    getProjectList: () => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/Project/getAllProject`,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_CYBERBUGS)}
            //user đã đăng nhập(nghĩa là có access token ở localstorage mới đc hiển thị all projects);
        })
    },


    updateProject: (projectUpdate) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/Project/updateProject?projectId=${projectUpdate.id}`,
            method: 'PUT',
            data: projectUpdate,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_CYBERBUGS)}
            //user đã đăng nhập(nghĩa là có access token ở localstorage mới đc hiển thị all projects);
        })
    }

}



