import {BaseService} from './baseService';


export class PriorityService extends BaseService {

    constructor() {
        super();
    }

    getAllTaskType = () => {
        return this.get('Priority/getAll');
    }


}



export const priorityService = new PriorityService();