import axios from 'axios';

const MEDICAL_MANAGEMENT_API_BASE_URL = "http://localhost:5000/api/medicine";

class MedicineService {

    getMedicine(){
        return axios.get(MEDICAL_MANAGEMENT_API_BASE_URL);
    }

    getMedicalStore() {
        return axios.get(MEDICAL_MANAGEMENT_API_BASE_URL + '/list/store');
    }

    getMedicineType() {
        return axios.get(MEDICAL_MANAGEMENT_API_BASE_URL + '/list/type');
    }
    
    createMedicine(medicine){
        return axios.post(MEDICAL_MANAGEMENT_API_BASE_URL, medicine);
    }

    getMedicineById(medicineId){
        return axios.get(MEDICAL_MANAGEMENT_API_BASE_URL + '/' + medicineId);
    }

    updateMedicine(medicine, medicineId){
        return axios.put(MEDICAL_MANAGEMENT_API_BASE_URL + '/' + medicineId, medicine);
    }

    deleteMedicine(medicineId){
        return axios.delete(MEDICAL_MANAGEMENT_API_BASE_URL + '/' + medicineId);
    }

    // getMedicineById(id) {
    //     return axios.get(MEDICAL_MANAGEMENT_API_BASE_URL + '/' + id);
    // }
}

export default new MedicineService()