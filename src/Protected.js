import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Protected = (props) => {
    const {Component} = props;
    const navigte = useNavigate();
    // const [count,setCount]  = useState();
    useEffect(()=>{

    const loginn =JSON.parse(localStorage.getItem('AllUsers'));

    
    // setFunction();
    if(!loginn){
        navigte('/login');
    }
    else{
        navigte('/');
    }
    });
  return (
    <div><Component /></div>
  )
}

export default Protected