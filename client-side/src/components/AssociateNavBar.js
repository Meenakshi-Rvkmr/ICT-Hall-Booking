import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'


const AssociateNavBar = () => {
  return (
    <>
     
        <Navbar bg="dark" variant="dark">
       
            <Navbar.Brand>
              <Link to={"/create-Associate"} className="nav-link">
                Add Associates
              </Link>
            </Navbar.Brand>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-Associate"} className="nav-link">
                  Create Associate
                </Link>
              </Nav>

              <Nav>
                <Link to={"/Associates"} className="nav-link">
                  Associate List
                </Link>
              </Nav>
            </Nav>
         
        </Navbar>
  
    </>
  );
};

export default AssociateNavBar;
