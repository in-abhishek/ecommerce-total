import { useContext, useEffect } from 'react';
import styled from 'styled-components'
import './App.css';
import TodoContext from './comp/context/ContextApi';
import About from './comp/context/about/About';
import { useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';
import SingleProd from './comp/context/singleProd/SingleProd';
import Checkout from './comp/context/checkout/Checkout';
import Login from './comp/context/login/Login';
import Register from './comp/context/login/Register';
import Louout from './comp/context/login/Louout';
import Compare from './comp/context/compare/Compare';
import Protected from './Protected';
function App() {
  const { name, setName, getData, cartdarta, loginData, logUser,compareData, setCompareData, handlecartCompare } = useContext(TodoContext);
  // cartdarta.reduce((acc, current) => {
  //   return acc + current;
  // }, 0);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path={"/"} element={<Protected Component={About} />} />
          {/* <Route path='/' element={<About />} /> */}
          <Route path='/register' element={<Register />} />
          {
            logUser  ? <Route path='/login' element={<Login />} /> : <Route path='/login' element={<Login />} />
          }
          <Route path='/single-product/:id' element={<SingleProd />} />
          {
            logUser  ? <Route path='/checkout' element={<Checkout cartdarta={cartdarta} />} /> : <Route path='/login' element={<Login />} />
          }
          {
            compareData.length > 0 && <Route path='/compareCart' element={<Compare compareData={compareData} />} /> 
          }
        </Routes>
      </BrowserRouter>
      

    </div>
  );
}

export default App;
