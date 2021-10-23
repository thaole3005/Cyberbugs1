import {BaseService} from './baseService';


export class ProjectService extends BaseService {

    constructor() {
        super();
    }

    deleteProject = (id) => {
        return this.delete(`/Project/deleteProject?projectId=${id}`)
    }

    getProjectDetai = (projectId) => {
        return this.get(`Project/getProjectDetail?id=${projectId}`);
    }

    getAllProject = () => {
        return this.get(`Project/getAllProject`);
    }


}



export const projectService = new ProjectService();