import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartProduct from '../products/CartProduct';
import { List } from 'react-bootstrap-icons';
import TodoContext from '../ContextApi';
import { CloseButton } from 'react-toastify';

const Header = (props) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { logUser, compareData, setCompareData, handlecartCompare } = useContext(TodoContext);
    const { handleShowCart, producid, handleProdRemove, removeAllProd, cartproducts, carts, setLogUser } = props;
    const handleShow = () => {
        setShow(!show);
    }
    const handleCart = () => {
        setShow(!show);
        handleShowCart();
    }
    return (
        <div className="about-header">
            <span><h1>abhi E-commerce</h1></span>
            <div className='header-nav'>
                <div className='showNav desktop'>
                    <span className='totalCart' onClick={handleCart}>cart <span className='showcart'>{producid.length}</span></span>
                    {
                        compareData.length > 0 ? <Link className='totalCart' to='/compareCart'>Compare<span className='showcart'>{compareData.length}</span></Link> : ''
                    }
                    {
                        logUser ? <Link className='totalCart' to='/login'>Logout</Link> : <><Link className='totalCart' to='/login'>Login</Link><Link className='totalCart' to='/register'>Register</Link></>
                    }

                </div>
                {show ?
                    <div className='showNav mobile'>
                        <span className='totalCart' onClick={handleCart}>cart <span className='showcart'>{producid.length}</span></span>
                        {
                            compareData.length > 0 ? <Link className='totalCart' to='/compareCart'>Compare<span className='showcart'>{compareData.length}</span></Link> : ''
                        }

                        {
                            logUser ? <Link className='totalCart' to='/login'>Logout</Link> : <><Link className='totalCart' to='/login'>Login</Link> <Link className='totalCart' to='/register'>Register</Link></>
                        }
                    </div> : ''
                }
                {!show ? <span className='show_nav' onClick={handleShow}><List /></span> : <span className='close-icon' onClick={handleShow}></span>}
            </div>
            {
                carts ?
                    <CartProduct producid={producid} handleProdRemove={handleProdRemove} removeAllProd={removeAllProd} cartproducts={cartproducts} /> : ''
            }
        </div>
    )
}

export default Header