import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

export default class AssociateTableRow extends Component {
  constructor(props) {
    super(props)
    this.deleteAssociate = this.deleteAssociate.bind(this)
  }

  deleteAssociate() {
    axios
      .delete(
        'http://localhost:4000/Associates/delete-Associate/' + this.props.obj._id,
      )
      .then((res) => {
        console.log('Associate successfully deleted!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.ictakid}</td>
        <td>{this.props.obj.phone}</td>
        <td>{this.props.obj.password}</td>
        <td>
          <Link
            className="edit-link" path={"product/:id"}
            to={'/edit-Associate/' + this.props.obj._id}
          >
            Edit
          </Link>
          <Button onClick={this.deleteAssociate} size="sm" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    )
  }
}
