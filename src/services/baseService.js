import Axios from 'axios';
import { DOMAIN_CYBERBUGS } from '../util/constants/settingSystem';
import { TOKEN_CYBERBUGS } from './../util/constants/settingSystem';


//PUT json về backend
export class BaseService {
    put = (url, model) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'PUT',
            data: model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_CYBERBUGS)}

        })
    }


    post = (url, model) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'POST',
            data: model,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_CYBERBUGS)}

        })
    }



    get = (url) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_CYBERBUGS)}

        })
    }



    delete = (url) => {
        return Axios({
            url: `${DOMAIN_CYBERBUGS}/${url}`,
            method: 'DELETE',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(TOKEN_CYBERBUGS)}

        })
    }



}