import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios'
import Table from './table';
// import { Button } from 'reactstrap';
class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
           mobile:'',
            id: ''

        };
        this.add = this.add.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateMobile = this.updateMobile.bind(this);
        this.getContacts = this.getContacts.bind(this);
        this.update = this.update.bind(this);
        this.editTableRecordHandler = this.editTableRecordHandler.bind(this);
        this.resetState = this.resetState.bind(this);
    }
    add() {
        
        const req = {
            name: this.state.name,
            mobile: this.state.mobile
        };
        axios.post('http://localhost:9800/addcontact', req, { withCredentials: true }).then(res => {
            this.getContacts();
            alert('Contact added succefully');
        }).catch(error => {
            console.log('Error: ', error);
            alert('please add both filed');
            this.setState({
                errorMessage: 'Incorrect info'
            });
        });

    }
    resetState() {
        this.setState({
            name: '',
            mobile: '',
            tableRecord: [],
            id: ''
        });
    }
    update() {
        const req = {
            name: this.state.name,
            mobile: this.state.mobile
           
        };
        const id = this.state.id;
        axios.patch('http://localhost:9800/contacts/' + id, req, { withCredentials: true }).then((res) => {
            this.getContacts();
        }).catch(error => console.log('error: ', error));

        alert('contact updated successfully!');

    }
    updateName(evt) {
        this.setState({
            name: evt.target.value
        });
    }
    updateMobile(evt) {
        this.setState({
            mobile: evt.target.value
        });
    }
    getContacts() {
        this.resetState();
        axios.get('http://localhost:9800/contacts').then(res => {
            this.setState({
                tableRecord: res.data
            });
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'Incorrect info'
            });
        });
    }
    componentDidMount() {
        this.getContacts();
    }
    editTableRecord(evt) {
        this.setState({
            name: evt.target.value,
            mobile: evt.target.value
            
        });
    }
    editTableRecordHandler(id, item) {
        this.setState({
            name: item.name,
            mobile: item.mobile,
            id: id
        });
    }
    deleteTableRecordHandler(id) {
        console.log({'in delete:':id});
        axios.delete(`http://localhost:9800/contact/${id}`, { withCredentials: true }).then((res) => {
                console.log('delete',res);
                alert('contact deleted successfully');
            this.getContacts();
        }).catch(error => console.log('error: ', error));
       
    }
    render() {
        console.log('this.state.tableRecord: ', this.state.tableRecord);
        return (
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Contacts</h2>
                <div className="row">
                    <div className="table-responsive">
                         <Table
                            data={this.state.tableRecord}
                            editTableRecord={this.editTableRecordHandler}
                            deleteTableRecord={this.deleteTableRecordHandler} /> 
                    </div>
                </div>

                <div className="row my-2">
                    <div className="col">
                        <input type="text" value={this.state.name} onChange={this.updateName} className="form-control" placeholder=" Name" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col">
                        <input type="number" value={this.state.mobile} onChange={this.updateMobile} className="form-control" placeholder="Enter Mobile no." min="00000" max="9999999999" />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col text-right">
                        {this.state.id !== '' ?
                            <div>
                                <button className="btn btn-sm btn-primary" onClick={this.update}> Update</button>
                                <button className="btn btn-sm btn-warning ml-3" onClick={this.getContacts}> Cancel</button>
                            </div>
                            :
                            <button className="btn btn-sm btn-success ml-3" onClick={this.add}> Add</button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default Category;