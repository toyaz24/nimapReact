import React, { Component } from 'react'
import MedicineService from '../services/medicineService';
import { toast } from 'react-toastify';

class ManageMedicineComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                stores: []
        }
        this.addMedicine = this.addMedicine.bind(this);
        this.editStore = this.editMedicine.bind(this);
        this.deleteStore = this.deleteMedicine.bind(this);
    }

    deleteMedicine(id){
        MedicineService.deleteMedicine(id).then( res => {
            MedicineService.getMedicine().then((res) => {
                console.log(res);
                toast.success(res.data.message)
                this.setState({ stores: res.data.data});
            });
        });
    }
    viewMedicine(id){
        this.props.history.push(`/view-employee/${id}`);
    }
    editMedicine(id){
        this.props.history.push(`/add-medicine/${id}`);
    }

    componentDidMount(){
        MedicineService.getMedicine().then((res) => {
            console.log(res);
            this.setState({ stores: res.data.data});
        });
    }

    addMedicine(){
        console.log("1111111111111",this.props);
        console.log("22222222");
        this.props.history.push('/add-medicine/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Medicine List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addMedicine}> Add Medicine</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Action </th> 
                                    <th> Medicine Name</th>
                                    <th> Medicine Price</th>
                                    <th> Expiry Date</th>
                                    <th> Medicine Type</th>
                                    <th> Store Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.stores.map(
                                        medicine => 
                                        <tr key = {medicine.id}>
                                            <td>
                                                 <button onClick={ () => this.editMedicine(medicine.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteMedicine(medicine.id)} className="btn btn-danger">Delete </button>
                                             </td>
                                             <td> { medicine.name} </td>   
                                             <td> {medicine.price}</td>
                                             <td> {medicine.expiryDate}</td>
                                             <td> {medicine?.medicineType?.medicineTypeName}</td>                                             
                                             <td> {medicine?.storeData?.storeName}</td>                                             
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ManageMedicineComponent
