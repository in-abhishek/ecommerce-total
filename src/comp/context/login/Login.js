import React, { useContext, useEffect, useState } from 'react'
import './login.css'
import { useNavigate, Link } from 'react-router-dom';
import TodoContext from '../ContextApi';
const Login = () => {
    const { logUser, setLogUser } = useContext(TodoContext);
    const [loginData, setlLoginData] = useState({
        user: { email: '', pass: '' },
        errors: ''
    });
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleLogChange = (e) => {
        setlLoginData({
            user: { ...loginData.user, [e.target.name]: e.target.value },
            errors: { ...loginData.errors, [e.target.name]: '' }
        })
    }

    const handlePaste = (e) => {
        const pastedValue = e.clipboardData.getData('text');
        const updatedUser = { ...loginData.user, email: pastedValue };
        setlLoginData({
            user: updatedUser,
            errors: { ...loginData.errors, email: '' }
        });
    }

    const handleRegister = () => {
        navigate('/register');
    }
    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.entries(loginData.user).forEach(([key, value]) => {
            if (value === '') {
                newErrors[key] = `Please fill the ${key}.`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            console.log("newErrors->>>>>>", newErrors);
            setlLoginData({ ...loginData, errors: newErrors });
        } else {
            setlLoginData({ ...loginData, user: loginData.user });
            const findUser = JSON.parse(localStorage.getItem('AllUsers'));
            console.log("findUser->>>>>>", findUser);
            if (loginData.user.email !== '' && loginData.user.pass !== '') {
                for (const [user, singleUser] of Object.entries(findUser._data)) {
                    if (loginData.user.email === singleUser[1].email && loginData.user.pass === singleUser[1].pass) {
                        setLogUser(singleUser[1].name);
                        navigate('/');
                    }
                    else {
                        if (loginData.user.pass !== singleUser[1].pass) {
                        }
                        else if (loginData.user.email !== singleUser[1].email) {
                        }
                        navigate('/login');
                    }
                }
            }
        }
    }

    return (
        <div className='single-page-bg'>
            <div className='login '>
                <div className="text">
                    <span><h1>Login</h1></span>
                    {/* <span><Link className='goTOHome' to='/'>Home</Link></span> */}
                </div>
                <form action="" onSubmit={handleLoginSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Email: </label>
                        </div>
                        <div className="col-6"><input type="email" name='email' onPaste={handlePaste} placeholder='email' onClick={handleLogChange} />
                            {loginData.errors.email && <div className='error'>{loginData.errors.email} </div>}</div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Password: </label>
                        </div>
                        <div className="col-6"><input type="password" name='pass' onPaste={handlePaste} placeholder='psaaword' onClick={handleLogChange} />
                            {loginData.errors.pass && <div className='error'>{loginData.errors.pass} </div>}</div>
                    </div>
                    <div className="row registerBtn1">
                        <div className="col-6">
                            <button type='submit' className='registerBtn'>login</button>
                        </div>
                        <div className="col-6">
                            <button onClick={handleRegister} className='loginBtn registerBtn'>Not a Member</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login