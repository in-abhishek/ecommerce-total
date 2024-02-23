import React, { useContext, useEffect, useState } from 'react'
import './login.css';
import HashMap from 'hashmap';
import { useNavigate, Link } from 'react-router-dom';
import TodoContext from '../ContextApi';

const Register = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const { showcart2, setShowCart2 } = useContext(TodoContext);
    const [formData, setFormData] = useState({
        user: { name: '', email: '', mobile: '', pass: '' },
        errors: ''
    });
    const handleChange = (e) => {
        setFormData({
            user: { ...formData.user, [e.target.name]: e.target.value },
            errors: { ...formData.errors, [e.target.name]: '' }
        });
    }

    const handleLogin = () => {
        navigate('/login');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.entries(formData.user).forEach(([key, value]) => {
            if (value === '') {
                newErrors[key] = `Please fill the ${key}.`;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setFormData({ ...formData, errors: newErrors });
        } else {
            setUsers([...users, formData.user]);
            setShowCart2(true);
            setFormData({
                user: { name: '', email: '', mobile: '', pass: '' },
                errors: ''
            });
        }
    }
    let userMap = new HashMap();
    for (let i = 0; i < users.length; i++) {
        if (userMap.has(users[i].email)) {
            console.log("user Exist");
        }
        else {
            userMap.set(users[i].email, users[i]);
        }
    }
    useEffect(() => {
        localStorage.setItem('AllUsers', JSON.stringify(userMap));
    }, [formData.user, users]);
    return (
        <div className='single-page-bg'>
            <div className='register '>
            <div className="text">
                    <span><h1>Register</h1></span>
                    {/* <span><Link className='goTOHome' to='/'>Home</Link></span> */}
                </div>
                
                {
                    showcart2 ?
                        <div className="showcart-pop submitted-popUp">
                            <h3>your Details has been submitted</h3>
                        </div> 
                        : ''
                } 
                <form action="" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Name: </label>
                        </div>
                        <div className="col-6"><input type="text" name='name' value={formData.user.name} placeholder='name' onChange={handleChange} />
                            {formData.errors.name && <div className='error'>{formData.errors.name} </div>}</div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">email: </label>
                        </div>
                        <div className="col-6"><input type="email" name='email' value={formData.user.email} placeholder='email' onChange={handleChange} />
                            {formData.errors.email && <div className='error'>{formData.errors.email}</div>}</div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Mobile: </label>
                        </div>
                        <div className="col-6"><input type="text" name='mobile' value={formData.user.mobile} placeholder='mobile' onChange={handleChange} />
                            {formData.errors.mobile && <div className='error'>{formData.errors.mobile}</div>}</div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Password: </label>
                        </div>
                        <div className="col-6"><input type="password" name='pass' value={formData.user.pass} placeholder='psaaword' onChange={handleChange} />
                            {formData.errors.pass && <div className='error' >{formData.errors.pass}</div>}</div>
                    </div>
                    <div className="row registerBtn1">
                        <div className="col-6">
                            <button type='submit' className='registerBtn'>Register</button>
                        </div>
                        <div className="col-6">
                            <button onClick={handleLogin} className='loginBtn registerBtn'>Already a Member</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register