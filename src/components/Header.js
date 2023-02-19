import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Cookies} from 'react-cookie';
import "./Styling.css";
const HomeScreen = () => {
    const rescueInfo = localStorage.getItem("userName");
    const logoutHandler = () => {
        localStorage.removeItem("userName");localStorage.removeItem("id");
        const cookies = new Cookies();
        cookies.remove("token");
    };
    return (
        <Navbar collapseOnSelect style={{backgroundColor:"#4da6ff" }} variant='dark' expand="lg">
                <Navbar.Brand id="brand" href="/home">Rescue Service</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" >
                    <Nav className="mr-auto" style={{marginLeft:"2%"}}>
                        <Nav.Link id="link">Features</Nav.Link>
                        <Nav.Link id="link" href="reports">Reports</Nav.Link>
                        <Nav.Link id="link" href="contactus">Contact Us</Nav.Link>
                    </Nav>
                    <Nav className='mr-5'>
                    <NavDropdown  className='mr-5'  title={rescueInfo} id="nav-drop">
                            <NavDropdown.Item id="item" href="/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item id="item" onClick={logoutHandler} href="./">Log Out</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    );
}

export default HomeScreen;