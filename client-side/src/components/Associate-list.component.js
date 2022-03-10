import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import AssociateTableRow from './AssociateTableRow';


export default class AssociateList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Associates: []
    };
  }

  componentDidMount() {
    axios.get('/Associates/')
      .then(res => {
        this.setState({
          Associates: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.Associates.map((res, i) => {
      return <AssociateTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>ICTAKID</th>
            <th>Phone</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
    </div>);
  }
}