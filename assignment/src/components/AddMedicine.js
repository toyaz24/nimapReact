import React, { Component } from 'react'
import MedicineService from '../services/medicineService';
import { toast } from 'react-toastify';

class AddMedicineComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // step 2
            id: this.props.match.params.id,
            name: '',
            detail: '',
            price: '',
            quantity: '',
            expiryDate: '',
            medicalStoreId: 1,
            medicineTypeId: 1,
            medicalStoreType: [],
            medicineType: [],
            errors: {}
        }
        // this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        // this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateMedicine = this.saveOrUpdateMedicine.bind(this);
    }

    // step 3
    componentDidMount(){

        MedicineService.getMedicalStore().then( (res) =>{
            console.log(res)
            this.setState({ medicalStoreType: res.data.data});
        });

        MedicineService.getMedicineType().then( (res) =>{
            console.log(res)
            this.setState({ medicineType: res.data.data});
        });

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            MedicineService.getMedicineById(this.state.id).then( (res) =>{
                console.log('res ',res);
                let medicine = res.data.data;
                this.setState({
                    name: medicine.name,
                    detail: medicine.detail ,
                    price: medicine.price,
                    quantity: medicine.quantity,
                    expiryDate: medicine.expiryDate,
                    medicalStoreId: medicine.medicalStoreId,
                    medicineTypeId: medicine.medicineTypeId,
                    errors : {}
                });
            });

        }          
    }
    saveOrUpdateMedicine = (e) => {
        e.preventDefault();
        if(this.handleValidation()){
            console.log('Form has error')
        }else{
        
            // console.log(new Date("sfdsdfsdf" ,this.state.expiryDate))
        let medicine = {
            name: this.state.name,
            detail: this.state.detail,
            price: this.state.price,
            quantity: this.state.quantity,
            expiryDate: this.state.expiryDate ? new Date(this.state.expiryDate).toISOString() : new Date().toISOString(),
            // expiryDate: this.state.expiryDate.substring(0, 10) ? new Date(this.state.expiryDate).toISOString() : new Date().toISOString(),
            medicalStoreId: this.state.medicalStoreId,
            medicineTypeId: this.state.medicineTypeId
        };
        console.log('medicine => ' + JSON.stringify(medicine));

        // step 5
        if(this.state.id === '_add'){
            MedicineService.createMedicine(medicine).then(res =>{
                toast.success(res.data.message)
                this.props.history.push('/medicinelist');
            });
        }else{
            MedicineService.updateMedicine(medicine, this.state.id).then( res => {
                toast.success(res.data.message)
                this.props.history.push('/medicinelist');
            });
        }
    }
    }

    handleValidation(){
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if(!fields["name"]){
          formIsValid = false;
          errors["name"] = "Cannot be empty";
        }


        if(!fields["price"]){
            formIsValid = false;
            errors["price"] = "Cannot be empty";

          } else {
            if(!/^[0-9]*$/.test(fields["price"]))  {
                formIsValid = false;
                errors["price"] = "Invalid Price";
            }
        }

        if(!fields["quantity"]){
            formIsValid = false;
            errors["quantity"] = "Cannot be empty";

          } else {
            if(!/^[0-9]*$/.test(fields["quantity"]))  {
                formIsValid = false;
                errors["quantity"] = "Invalid quantity";
            }
        }

        if(!fields["detail"]){
            formIsValid = false;
            errors["detail"] = "Cannot be empty";

          }
  


          if(!fields["Medicine Type"]){
            formIsValid = false;
            errors["Medicine Type"] = "Cannot be empty";
          }

        this.setState({errors: errors});
        return formIsValid;
      }

    changeEmailHandler= (event) => {
        this.setState({
            [event.target.name] : event.target.value
          })
    }

    cancel(){
        this.props.history.push('/medicinelist');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Medicine</h3>
        }else{
            return <h3 className="text-center">Update Medicine</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className="row">
                                        <div className="col-5" className = "form-group">
                                            <label> Medicine Name: </label>
                                            <input placeholder="medicineName" name="name" className="form-control required" 
                                                value={this.state.name} required onChange={this.changeEmailHandler}/>
                                                <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                                        </div>
                                        <div className="col-2"></div>
                                        <div className="col-5" className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changeEmailHandler}/>
                                                <span style={{color: "red"}}>{this.state.errors["price"]}</span>
                                                
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-5" className = "form-group">
                                            <label> detail: </label>
                                            <input placeholder="detail" name="detail" className="form-control" 
                                                value={this.state.detail} onChange={this.changeEmailHandler}/>
                                                <span style={{color: "red"}}>{this.state.errors["detail"]}</span>
                                        </div>
                                        <div className="col-2"></div>
                                        <div className="col-5" className = "form-group">
                                            <label> quantity: </label>
                                            <input placeholder="quantity" name="quantity" className="form-control" 
                                                value={this.state.quantity} onChange={this.changeEmailHandler}/>
                                                <span style={{color: "red"}}>{this.state.errors["quantity"]}</span>
                                        </div>
                                        </div>
                                       
                                        <div className="row">
                                        <div className="col-5" className = "form-group">
                                        <label>
                                            Medicine Type</label>

                                            { <select className="form-control" name="medicineTypeId" onChange={this.changeEmailHandler} value={this.state.medicineTypeId}>
                                            {
                                                this.state.medicineType.map(
                                                    (medicine, key) => {
                                                        return <option key={key} value={medicine.id}>{medicine.medicineTypeName}</option>
                                                    }
                                                )
                                            }
                                            </select> }
                                           
                                        </div>
                                        <div className="col-2"></div>
                                        <div className="col-5" className = "form-group">
                                        <label>
                                            Medical Store</label>
                                            { <select className="form-control" name="medicalStoreId" onChange={this.changeEmailHandler} value={this.state.medicalStoreId}>
                                            {
                                                this.state.medicalStoreType.map(
                                                    (medicine, key) => {
                                                        return <option key={key} value={medicine.id}>{medicine.storeName}</option>
                                                    }
                                                )
                                            }
                                            </select> }
                                            
                                        </div>
                                        <div className="form-control">
                                        <input name="expiryDate" onChange={this.changeEmailHandler} value={this.state.expiryDate} type="date"/>
                                        </div>
                                        </div>
                                        <button className="btn btn-success" onClick={this.saveOrUpdateMedicine}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default AddMedicineComponent
