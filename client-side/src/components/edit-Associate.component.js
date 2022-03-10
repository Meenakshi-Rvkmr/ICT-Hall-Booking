import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default class EditAssociate extends Component {

  constructor(props) {
    super(props)

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeIctakid = this.onChangeIctakid.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // const location = useLocation();
    // const pathname = location.pathname.split("/");
    // const userid = pathname[pathname.length - 1];
    // const { userName } = useParams();

    // State
    this.state = {
      name: '',
      email: '',
      ictakid: '',
      phone: '',
      password: ''
    }
  }

  componentDidMount() {
    axios.get('/Associates/edit-Associate/' + this.props)
      .then(res => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          ictakid: res.data.ictakid,
          phone: res.data.phone,
          password: res.data.password
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeName(e) {
    this.setState({ name: e.target.value })
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeIctakid(e) {
    this.setState({ ictakid: e.target.value })
  }
  onChangePhone(e) {
    this.setState({ phone: e.target.value })
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()

    const AssociateObject = {
      name: this.state.name,
      email: this.state.email,
      ictakid: this.state.ictakid,
      phone: this.state.phone,
      password: this.state.password
    };

    axios.put('/Associates/update-Associate/' + this.props.match.params.id, AssociateObject)
      .then((res) => {
        console.log(res.data)
        console.log('Associate successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Associate List 
    this.props.history.push('/Associate-list')
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={this.state.name} onChange={this.onChangeName} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeEmail} />
        </Form.Group>

        <Form.Group controlId="Ictakid">
          <Form.Label>ICTAK-ID</Form.Label>
          <Form.Control type="text" value={this.state.ictakid} onChange={this.onChangeIctakid} />
        </Form.Group>
        <Form.Group controlId="Phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="number" value={this.state.phone} onChange={this.onChangePhone} />
        </Form.Group>
        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" value={this.state.password} onChange={this.onChangePassword} />
        </Form.Group>

        <Button className="sub"  variant="primary" size="lg" block="block" type="submit">
          Update 
        </Button>
      </Form>
    </div>);
  }
}