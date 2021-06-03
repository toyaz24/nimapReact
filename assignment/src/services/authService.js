import axios from 'axios';

const MEDICAL_MANAGEMENT_API_BASE_URL = "http://localhost:5000/api/auth";

class StoreService {

    login(loginData) {
        return axios.post(MEDICAL_MANAGEMENT_API_BASE_URL + '/login', loginData);
    }

    logout() {
     return    window.open('http://localhost:3000/user', '_self')
    }


    getStores(){
        return axios.get(MEDICAL_MANAGEMENT_API_BASE_URL);
    }

    createStore(store){
        return axios.post(MEDICAL_MANAGEMENT_API_BASE_URL, store);
    }

    getStoreById(storeId){
        return axios.get(MEDICAL_MANAGEMENT_API_BASE_URL + '/' + storeId);
    }

    updateStore(store, storeId){
        return axios.put(MEDICAL_MANAGEMENT_API_BASE_URL + '/' + storeId, store);
    }

    deleteStore(storeId){
        return axios.delete(MEDICAL_MANAGEMENT_API_BASE_URL + '/' + storeId);
    }
}

export default new StoreService()