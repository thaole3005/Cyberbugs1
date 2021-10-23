import {BaseService} from './baseService';


export class UserService extends BaseService {

    constructor() {
        super();
    }

    getUser = (keyWord) => {
        return this.get(`Users/getUser?keyword=${keyWord}`)
    }


    assignUserProject = (userProject) => {
        return this.post('Project/assignUserProject', userProject);
    }

    deleteUserProject = (userProject) => {
        return this.post('Project/removeUserFromProject', userProject);
    }

    getUsersByProjectId = (idProject) => {
       return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
    }


}


//tạo instance của class UserService
export const userService = new UserService();