import axios from 'axios';

const MEDICAL_MANAGEMENT_API_BASE_URL = "http://localhost:5000/api/store";

class StoreService {

    getStores(){
        return axios.get(MEDICAL_MANAGEMENT_API_BASE_URL);
    }

    getStoreType() {
        return axios.get(MEDICAL_MANAGEMENT_API_BASE_URL + '/list/type');
    }

    addStore(storeData) {
        return axios.post(MEDICAL_MANAGEMENT_API_BASE_URL + '/', storeData);
    }

    createStore(store){
        return axios.post(MEDICAL_MANAGEMENT_API_BASE_URL, store);
    }

    getStoreById(storeId){
        return axios.get(MEDICAL_MANAGEMENT_API_BASE_URL + '/' + storeId);
    }

    updatesStore(store, storeId){
        return axios.put(MEDICAL_MANAGEMENT_API_BASE_URL + '/' + storeId, store);
    }

    deleteStore(storeId){
        return axios.delete(MEDICAL_MANAGEMENT_API_BASE_URL + '/' + storeId);
    }
}

export default new StoreService()