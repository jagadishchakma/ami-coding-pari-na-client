import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';

const Layout = ({children}) => {
    return (
        <Fragment>
            <Header/>
                <Container>
                {children}
                </Container>
            <Footer/>
        </Fragment>
    );
};

export default Layout;