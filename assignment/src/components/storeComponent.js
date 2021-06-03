import React, { Component } from 'react'
import StoreService from '../services/storeService'
import { toast } from 'react-toastify';

class ListStoreComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                stores: []
        }
        this.addStore = this.addStore.bind(this);
        this.editStore = this.editStore.bind(this);
        this.deleteStore = this.deleteStore.bind(this);
    }

    deleteStore(id){
        StoreService.deleteStore(id).then( (res) => {
            StoreService.getStores().then((res) => {
                console.log(res);
                this.setState({ stores: res.data.data});
                toast.success(res.data.message);
            });
        });
    }
    viewStore(id){
        this.props.history.push(`/view-store/${id}`);
    }
    editStore(id){
        this.props.history.push(`/add-store/${id}`);
    }

    componentDidMount(){
        StoreService.getStores().then((res) => {
            console.log(res);
            this.setState({ stores: res.data.data});
            console.log("toast.success",res.data.message);
        });
    }

    addStore(){
        console.log("1111111111111",this.props);
        console.log("22222222");
        this.props.history.push('/add-store/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Store List</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addStore}> Add Store</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Action </th> 
                                    <th> Store Name</th>
                                    <th> Username</th>
                                    <th> Store Licence</th>
                                    <th> Store Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.stores.map(
                                        store => 
                                        <tr key = {store.id}>
                                            <td>
                                                 <button onClick={ () => this.editStore(store.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteStore(store.id)} className="btn btn-danger">Delete </button>
                                             </td>
                                             <td> { store.storeName} </td>   
                                             <td> {store.username}</td>
                                             <td> {store.storeLicense}</td>
                                             <td> {store?.storeType?.typeName}</td>                                             
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

export default ListStoreComponent
