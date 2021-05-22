import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
    const history = useHistory();
    // handle log in data
    let name;
    let photo;
    let token;
    if(localStorage.getItem('site_fdkj_hjfdhfj')){
        const user = JSON.parse(localStorage.getItem('site_fdkj_hjfdhfj'));
        name = user.n_udfjjdglskkjfdgjjkj;
        photo = user.p_jfkdsjfksdjljdslk;
        token = user.token;
    }else{
        name = false;
        photo = false;
        token = false;
    }
    // handle log out
    const handleLogOut = () => {
        localStorage.removeItem('site_fdkj_hjfdhfj');
        history.push('/api');
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/api">API</Nav.Link>
                        <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
                        <Nav.Link>{token ? <img className="rounded-circle" src={`http://localhost:5000/images/${photo}`} title={name} width="30" height="30" alt={name}/> : null}</Nav.Link>
                        <Nav.Link>{token ?  <button className="btn btn-outline-danger p-1" onClick={handleLogOut}>Log Out</button> : null}</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;