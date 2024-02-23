import React, { useContext, useEffect, useState } from 'react'

import TodoContext from '../ContextApi'
import Product from '../products/Product';
import CartProduct from '../products/CartProduct';
import { Link } from 'react-router-dom';
import Header from '../header/Header';
const About = () => {
    const { getData, productData, producid, setProductId } = useContext(TodoContext);
    const [carts, showCart] = useState(false);
    const [cartproducts, setCartProduct] = useState([]);
    const [isReadMoreShown, setReadMoreShown] = useState(false);
    // const [cart, setCart] = useState(localStorage.getItem('productid') ? localStorage.getItem('productid') : 0);
    // useEffect(() => {
    //     localStorage.setItem('productid', parseInt(cart) + producid.length);
    // }, [producid.length]);
    console.log("productData->>>>", productData);
    useEffect(() => {
        getData();
    }, []);
    const handleProdRemove = (removedId) => {
        console.log("removedId->>>>", removedId);
        const remainingItems = producid.filter((items) => {
            return items !== removedId;
        });
        setProductId(remainingItems);
    }
    const handleShowCart = () => {
        showCart(true);
    }
    const removeAllProd = (showitem) => {
        showCart(showitem);

    }
    return (
        <div className='About-app'>
            <Header handleShowCart={handleShowCart} producid={producid} handleProdRemove={handleProdRemove} removeAllProd={removeAllProd} cartproducts={cartproducts} carts={carts} />
            {productData ? <Product data={productData} /> : ''}
        </div>
    )
}
export default About