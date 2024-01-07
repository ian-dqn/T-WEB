import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import "../../asset/css/Aside.css";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    return (
        <Navbar variant="dark" className="flex-column asidBar" >
            <Nav  className="flex-column">
                <Nav.Item className='navItem'>
                    <Link className='link-aside' to={`/edit/${user._id}`} active>
                        Profil
                    </Link>
                </Nav.Item>
                <Nav.Item className='navItem' >
                    <Link className='link-aside' to="/myCrypto" >
                        Mes Cryptos
                    </Link>
                </Nav.Item>
                <Nav.Item  className='navItem'>
                    <Link className='link-aside' to="/news" >
                        Actualités
                    </Link>
                </Nav.Item>
                <Nav.Item className='navItem'>
                    <Link className='link-aside' href="/" active>
                        Echanges
                    </Link>
                </Nav.Item>
            </Nav>
        </Navbar>
    );
};

export default Sidebar;
