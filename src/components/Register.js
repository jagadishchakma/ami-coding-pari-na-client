import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Icon from '../assets/images/login.png';

const Register = () => {
    const [user, setUser] = useState({uname: '', uemail: '', upassword: '', repassword: ''});
    const [valid, setValid] = useState({});
    const [loading, setLoading] = useState(null);
    const history = useHistory();
    
    // handle input change
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;


        // user photo validation and set
        if(name === "uphoto"){
            const newUser = {...user};
            newUser[name] = e.target.files[0];
            setUser(newUser);
            // vlaidation
            const fileName = e.target.files[0].name;
            const fileSplit = fileName.split('.');
            const fileExt = fileSplit[fileSplit.length - 1];
            if(fileExt === 'jpg' || fileExt === 'png' || fileExt === 'jpg' || fileExt === 'svg' || fileExt === 'jpeg'){
                const newValid = {...valid};
                newValid[name] = true;
                setValid(newValid);
            }else{
                const newValid = {...valid};
                newValid[name] = false;
                setValid(newValid);
            }
        }


         // name validation and set
         if(name === 'uname'){
            const newUser = {...user};
            newUser[name] = value;
            setUser(newUser);
            const checkValid = /\w{3}/g.test(value);
            if(checkValid){
                const newValid = {...valid};
                newValid[name] = true;
                setValid(newValid);
            }else{
                const newValid = {...valid};
                newValid[name] = false;
                setValid(newValid);
            }
            
        }


        // email validation and set
        if(name === 'uemail'){
            const newUser = {...user};
            newUser[name] = value;
            setUser(newUser);
            const emailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
            if(emailCheck){
                const newValid = {...valid};
                newValid[name] = true;
                setValid(newValid);
            }else{
                const newValid = {...valid};
                newValid[name] = false;
                setValid(newValid);
            }
            
        }
        
        // password validation and set
        if(name === "upassword"){
            const newUser = {...user};
            newUser.upassword = value;
            setUser(newUser);
            const passCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value);
            if(passCheck){
                const newValid = {...valid};
                newValid[name] = true;
                setValid(newValid);
            }else{
                const newValid = {...valid};
                newValid[name] = false;
                setValid(newValid);
            }
        }

        // repassword validation and match
        if(name === "repassword"){
            const newUser = {...user};
            newUser.repassword = value;
            setUser(newUser);
            if(value === user.upassword){
                const newValid = {...valid};
                newValid[name] = true;
                setValid(newValid);
            }else{
                const newValid = {...valid};
                newValid[name] = false;
                setValid(newValid);
            }
        }
        
    }

    // handle Form Submit
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if(valid.uname && valid.uemail && valid.upassword && valid.repassword && valid.uphoto){
            const formData = new FormData();
            formData.set('name', user.uname);
            formData.set('email', user.uemail);
            formData.set('password', user.upassword);
            formData.set('photo', user.uphoto);
            setLoading('loading');
            fetch('http://localhost:5000/user/signup',{
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 'user exist'){
                    setLoading(data.status);
                }else{
                    localStorage.setItem('site_fdkj_hjfdhfj', JSON.stringify(data));
                    setLoading('success');
                    e.target.reset();
                    history.push('/api');
                }
            })
        }else{
            console.log(valid);
            setLoading('error');
        }
    }
   
    return (
        <div className="sign">
            <Row>
                <Col lg={6} md={6}>
                    <img src={Icon} alt="Log In" />
                </Col>
                <Col lg={6} md={6}>
                    <form onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-3">
                            <input type="text" className={ `form-control ${user.uname.length > 0 && (valid.uname ? 'is-valid' : 'is-invalid')}`} onChange={handleInputChange} name="uname" id="floatingInput" placeholder="Name" required/>
                            <label htmlFor="floatingInput">Your Name {!valid.uname && user.uname.length>0 && 'Minimum 3 Characters'}</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className={ `form-control ${user.uemail.length > 0 && (valid.uemail ? 'is-valid' : 'is-invalid')}`} onChange={handleInputChange} name="uemail" id="floatingEmail" placeholder="name@example.com" required/>
                            <label htmlFor="floatingEmail">Your Email {!valid.uemail && user.uemail.length>0 && 'Invalid'}</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className={ `form-control ${user.upassword.length > 0 && (valid.upassword ? 'is-valid' : 'is-invalid')}`} onChange={handleInputChange} name="upassword" id="floatingPassword" placeholder="Password" required/>
                            <label htmlFor="floatingPassword"> Password {!valid.upassword && user.upassword.length>0 && 'Should be  at least 6 character [a-zA-Z][0-9]'}</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className={ `form-control ${user.repassword.length > 0 && (valid.repassword ? 'is-valid' : 'is-invalid')}`} onChange={handleInputChange} name="repassword" id="floatingRePassword" placeholder="Re-type Password" required/>
                            <label htmlFor="floatingRePassword">Re-password {!valid.repassword && user.repassword.length>0 && 'Not Matching'}</label>
                        </div>
                        <div className="form-group mb-3">
                            <input type="file" className={`form-control ${user.uphoto && (valid.uphoto ? 'is-valid' : 'is-invalid')}`} onChange={handleInputChange} name="uphoto" required/>
                        </div>
                        <div className="form-floating">
                            <button type="submit" className="btn btn-success login-btn">{loading === 'loading' ? 'Loading...' : loading === 'success' ? 'Signup success' : loading === 'error' ? 'Signup error' : loading === 'user exist' ? 'Email already exist! Try another' : 'Register'}</button>
                        </div>
                    </form>
                    <h5 className="text-center">Already have an account? <Link to="/signin">Login</Link></h5>
                    
                </Col>
            </Row>
        </div>
    );
};

export default Register;