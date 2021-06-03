import React, { Component } from 'react'
import StoreService from '../services/storeService';
import { toast } from 'react-toastify';

class AddStoreComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // step 2
            id: this.props.match.params.id,
            storeName: '',
            username: '',
            mobileNumber: '',
            emailId: '',
            address1: '',
            address2: '',
            storeLicense: 'Wholesale Drug Licence',
            storeTypeId: 1,
            storeRegistrationNo: '',
            password: '',
            storeType: [],
            errors: {}

        }
        this.saveOrUpdateStore = this.saveOrUpdateStore.bind(this);
    }

    // step 3
    componentDidMount(){
        StoreService.getStoreType().then( (res) =>{
            console.log(res)
            this.setState({ storeType: res.data.data});
        });
        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            StoreService.getStoreById(this.state.id).then( (res) =>{
                console.log('res ',res);
                let store = res.data.data;
                this.setState({
                    storeName: store.storeName,
                    username: store.username,
                    mobileNumber: store.mobileNumber,
                    emailId: store.emailId,
                    address1: store.address1,
                    address2: store.address2,
                    storeLicense: store.storeLicense,
                    storeTypeId: store.storeTypeId,
                    storeRegistrationNo: store.storeRegistrationNo,
                    password: store.password});
            });

        }        
    }
    saveOrUpdateStore = (e) => {
        e.preventDefault();
        
        if(!this.handleValidation()){
            console.log('Form has error')
        }else{
        let store =  {
            storeName: this.state.storeName,
            username: this.state.username,
            mobileNumber: this.state.mobileNumber,
            emailId: this.state.emailId,
            address1: this.state.address1,
            address2: this.state.address2,
            storeLicense: this.state.storeLicense,
            storeTypeId: this.state.storeTypeId,
            storeRegistrationNo: this.state.storeRegistrationNo,
            password: this.state.password
        };
        console.log('store => ' + JSON.stringify(store));

        // step 5
        if(this.state.id === '_add'){

            StoreService.addStore(store).then(res =>{
                toast.success(res.data.message);
                this.props.history.push('/store');
            });
    
        }else{
            StoreService.updatesStore(store, this.state.id).then( res => {
                toast.success(res.data.message);
                this.props.history.push('/store');
            });
        }
    }
    }
    
    handleValidation(){
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        if(!fields["storeName"]){
          formIsValid = false;
          errors["storeName"] = "Cannot be empty";
        } else {
            if(!/^[a-zA-Z ]*$/.test(fields["storeName"]))  {
                formIsValid = false
                errors["storeName"] = "Invalid store name";
            }
        }

        if(!fields["username"]){
          formIsValid = false;
          errors["username"] = "Cannot be empty";
        }

        if(!fields["mobileNumber"]){
            formIsValid = false;
            errors["mobileNumber"] = "Cannot be empty";

          } else {
            if(!/^[0-9]*$/.test(fields["mobileNumber"]) || fields["mobileNumber"].length !== 10)  {
                formIsValid = false
                errors["mobileNumber"] = "Invalid mobile number";
            }
        }
  
          if(!fields["emailId"]){
            formIsValid = false;
            errors["emailId"] = "Cannot be empty";
          } else {
            if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(fields["emailId"]))  {
                formIsValid = false
                errors["emailId"] = "Invalid email";
            }
          }

          if(!fields["address1"]){
            formIsValid = false;
            errors["address1"] = "Cannot be empty";
          }
  
          if(!fields["address2"]){
            formIsValid = false;
            errors["address2"] = "Cannot be empty";
          }
          if(!fields["storeLicense"]){
            formIsValid = false;
            errors["storeLicense"] = "Cannot be empty";
          }
  
          if(!fields["storeTypeId"]){
            formIsValid = false;
            errors["storeTypeId"] = "Cannot be empty";
          }

          if(!fields["storeRegistrationNo"]){
            formIsValid = false;
            errors["storeRegistrationNo"] = "Cannot be empty";
          }else {
            if(!/^[0-9]*$/.test(fields["storeRegistrationNo"]))  {
                formIsValid = false
                errors["storeRegistrationNo"] = "Invalid Store Registration number";
            }
        }
  
          if(!fields["password"]){
            formIsValid = false;
            errors["password"] = "Cannot be empty";
          } else {
              if (fields["password"].length < 5) {
                formIsValid = false
                errors["password"] = "Password length should  be greater than 5 characters";
              }
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
        this.props.history.push('/store');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Store</h3>
        }else{
            return <h3 className="text-center">Update Store</h3>
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
                                            <label> store Name: </label>
                                            <input placeholder="storeName" name="storeName" className="form-control required" 
                                                value={this.state.storeName} required onChange={this.changeEmailHandler}/>
                                            <span style={{color: "red"}}>{this.state.errors["storeName"]}</span>
                                        </div>
                                        <div className="col-2"></div>
                                        <div className="col-5" className = "form-group">
                                            <label> username: </label>
                                            <input placeholder="username" name="username" className="form-control" 
                                                value={this.state.username} onChange={this.changeEmailHandler}/>
                                                <span style={{color: "red"}}>{this.state.errors["username"]}</span>
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-5" className = "form-group">
                                            <label> password: </label>
                                            <input type='password' placeholder="password" name="password" className="form-control" 
                                                value={this.state.password} onChange={this.changeEmailHandler}/>
                                                <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                                        </div>
                                        <div className="col-2"></div>
                                        <div className="col-5" className = "form-group">
                                            <label> mobileNumber: </label>
                                            <input placeholder="mobileNumber" name="mobileNumber" className="form-control" 
                                                value={this.state.mobileNumber} onChange={this.changeEmailHandler}/>
                                                <span style={{color: "red"}}>{this.state.errors["mobileNumber"]}</span>
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-5" className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                            <span style={{color: "red"}}>{this.state.errors["emailId"]}</span>
                                        </div>
                                        <div className="col-2"></div>
                                        <div className="col-5" className = "form-group">
                                            <label> address1: </label>
                                            <input placeholder="address1" name="address1" className="form-control" 
                                                value={this.state.address1} onChange={this.changeEmailHandler}/>
                                                <span style={{color: "red"}}>{this.state.errors["address1"]}</span>
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-5" className = "form-group">
                                            <label> address2: </label>
                                            <input placeholder="address2" name="address2" className="form-control" 
                                                value={this.state.address2} onChange={this.changeEmailHandler}/>
                                                <span style={{color: "red"}}>{this.state.errors["address2"]}</span>
                                        </div>
                                        <div className="col-2"></div>
                                        <div className="col-5" className = "form-group">
                                            <label> storeRegistrationNo: </label>
                                            <input placeholder="storeRegistrationNo" name="storeRegistrationNo" className="form-control" 
                                                value={this.state.storeRegistrationNo} onChange={this.changeEmailHandler}/>
                                                <span style={{color: "red"}}>{this.state.errors["storeRegistrationNo"]}</span>
                                        </div>
                                        </div>


                                        <div className="row">
                                        <div className="col-5" className = "form-group">
                                            <label> storeLicense: </label>
                                            <br />
                                            <div className="row">
                                                <div className="col-6">
                                                <label for='retailDrug' className="text-nowrap">Retail Drug License</label>
                                                    <input type="radio" id='retailDrug' placeholder="storeLicense" name="storeLicense" className="form-control" 
                                                        value="Retail Drug License"
                                                        checked={this.state.storeLicense === "Retail Drug License"}
                                                        onChange={this.changeEmailHandler}/>
                                                </div>
                                                <div className="col-6">
                                                        <label for='wholesale' className="text-nowrap">Wholesale Drug Licence</label>
                                                    <input type="radio" id='wholesale' placeholder="storeLicense" name="storeLicense" className="form-control" 
                                                    value="Wholesale Drug Licence"
                                                    checked={this.state.storeLicense === "Wholesale Drug Licence"}
                                                    onChange={this.changeEmailHandler}/>
                                                </div>
                                            </div>
                                            <span style={{color: "red"}}>{this.state.errors["storeLicense"]}</span>
                                        </div>
                                        <div className="col-2"></div>
                                        </div>
                                        <div className="row">
                                        <div className="col-5" className = "form-group">
                                        <label>
                                        storeTypeId

                                        </label>
                                            { <select className="form-control" name="storeTypeId" value={this.state.storeTypeId}>
                                            {
                                                this.state.storeType.map(
                                                    (store, key) => {
                                                        return <option key={key} value={store.id}>{store.typeName}</option>
                                                    }
                                                )
                                            }
                                            </select> }
                                            <span style={{color: "red"}}>{this.state.errors["storeTypeId"]}</span>
                                        </div>
                                        </div>
                                        <button type="submit" className="btn btn-success" onClick={this.saveOrUpdateStore}>Save</button>
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

export default AddStoreComponent
