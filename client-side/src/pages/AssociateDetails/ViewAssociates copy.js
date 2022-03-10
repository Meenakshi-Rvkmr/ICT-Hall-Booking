import React from "react";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import './ViewAssociate.css';
import { Link } from "react-router-dom";

function ViewAssociates() {

// window.open("http://localhost:3001")

  return (
    <div className="App">
     
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={'/create-Associate'} className="nav-link">
                  Add Associates
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={'/create-Associate'} className="nav-link">
                    Create Associate
                  </Link>
                </Nav>

                <Nav>
                  <Link to={'/Associate-list'} className="nav-link">
                    Associate List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>
      
     
    </div>
  );
}

export default ViewAssociates;
