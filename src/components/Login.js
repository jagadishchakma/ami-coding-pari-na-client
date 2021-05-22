import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Icon from '../assets/images/login.png';

const Login = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    // hnadle input change
    const handleInputChange = (e) => {
        const loginUser = {...user};
        loginUser[e.target.name] = e.target.value;
        setUser(loginUser);
    };

    // handle login form submit
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoading('loading');
        fetch('http://localhost:5000/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            setLoading(data.status);
            localStorage.setItem('site_fdkj_hjfdhfj', JSON.stringify({n_udfjjdglskkjfdgjjkj: data.name, p_jfkdsjfksdjljdslk: data.photo, token: data.token}));
            if(data.status === 'success'){
                history.push('/api');
            }
        })
    }

    // return view
    return (
        <div className="sign">
            <Row>
                <Col lg={6} md={6}>
                    <img src={Icon} alt="Log In" />
                </Col>
                <Col lg={6} md={6}>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" onChange={handleInputChange} name="uemail" id="floatingInput" placeholder="name@example.com" required/>
                            <label htmlFor="floatingInput"><i className="fa fa-envelope"></i> Email</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" onChange={handleInputChange} name="upassword" id="floatingPassword" placeholder="Password" required/>
                            <label htmlFor="floatingPassword"><i className="fa fa-lock"></i> Password</label>
                        </div>
                        <div className="form-floating">
                            <button type="submit" className="btn btn-success login-btn">{loading === 'loading' ? 'loading...' : loading === 'success' ? 'Login Success' : loading === 'error' ? 'Login error! Try again' : 'Login'}</button>
                        </div>
                    </form>
                    <h5 className="text-center">Don't have an account? <Link to="/signup">Create Account</Link></h5>
                    
                </Col>
            </Row>
        </div>
    );
};

export default Login;