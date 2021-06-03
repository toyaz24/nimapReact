import axios from 'axios';

const MEDICAL_MANAGEMENT_API_BASE_URL = "http://jsonplaceholder.typicode.com/todos";

class StoreService {

    getTask(){
        return axios.get(MEDICAL_MANAGEMENT_API_BASE_URL);
    }
}

export default new StoreService()