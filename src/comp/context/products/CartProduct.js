import HashMap from 'hashmap';
import React, { useContext, useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import TodoContext from '../ContextApi';
import { Navigate, useNavigate } from 'react-router-dom';
import { Dash, Plus } from 'react-bootstrap-icons';

const CartProduct = (props) => {
    const { producid, removeAllProd, handleProdRemove } = props;
    const { showImage, cartdarta, setCartData, price, setPrice, logUser } = useContext(TodoContext);
    console.log("producid->>>>", producid);
    const [cartproducts, setCartProduct] = useState([]);
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    let sumTotal = 1;
    let map = new HashMap();
    for (let i = 0; i < producid.length; i++) {
        if (map.has(producid[i])) {
            map.set(producid[i], map.get(producid[i]) + 1);
        }
        else {
            map.set(producid[i], 1);
        }
    }

    useEffect(() => {
        const fetchProductData = async () => {
            const promisesData = [];
            for (const [product, quantity] of map.entries()) {
                if (map.size === 0) {
                    console.log("Product nahi hai");
                }
                else {
                    const apiUrl = `https://api.escuelajs.co/api/v1/products/${product}`;
                    promisesData.push({
                        data: fetch(apiUrl).then(response => response.json()),
                        total_count: quantity
                    });
                }
            }
            try {
                const productDataArray = await Promise.all(promisesData.map(async (promiseObj) => {
                    const response = await promiseObj.data;
                    return {
                        data: response,
                        total_count: promiseObj.total_count
                    };
                }));
                setCartProduct(productDataArray);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProductData();
    }, [producid]);

    const handlePrice = (price, total) => {
        return price * total;
    }
    for (let i = 0; i < cartproducts.length; i++) {
        let total_priceData = cartproducts[i].data.price * cartproducts[i].total_count;
        sumTotal += total_priceData;
    }
    setPrice((sumTotal - 1));
    const handleCheckOut = () => {
        setCartData(cartproducts);
        navigate('/checkout');
    }
    const handleAddCart = (index) => {
        const updatedCartProducts = [...cartproducts];
        updatedCartProducts[index].total_count += 1;
        setCartProduct(updatedCartProducts);
    };

    const handleSubCart = (index) => {
        const updatedCartProducts = [...cartproducts];
        if (updatedCartProducts[index].total_count > 1) {
            updatedCartProducts[index].total_count -= 1;
            setCartProduct(updatedCartProducts);
        }
    };


    return (
        <div className="all-cartproducts">
            <div className="scoll">
                <div className="icons" onClick={() => removeAllProd(false)}>
                </div>
                {cartproducts.length > 0 ?
                    cartproducts.map((product, key) => {
                        return (
                            <div className="cartsingle-product" key={key}>
                                <div className="cartsinglesingle-content-product">
                                    <div className="close-icon" onClick={() => handleProdRemove(product?.data?.id)}>
                                    </div>
                                    {
                                        product.data.images ?
                                            <div className="cartsingleproduct-image">
                                                <div className="cartsingleimaegs">
                                                <img src={product?.data?.category?.image} alt="" />
                                                    {/* <img src={showImage(product.data.images[0])} alt="" /> */}
                                                </div>
                                            </div> : ''
                                    }
                                    <div className="cartsingleproduct-content">
                                        {
                                            product.data.title ?
                                                <div className="product-title">
                                                    <p>{product.data.title}</p>
                                                </div> : ''
                                        }
                                        {
                                            product.data.price ?
                                                <div className="product-cat-price">
                                                    <div className="price">
                                                        <span>Price : {product.total_count > 1 ? handlePrice(product.data.price, product.total_count) : product.data.price}</span>
                                                    </div>
                                                    <div className="price">
                                                        <button className='btn' onClick={() => handleSubCart(key)}> <Dash /></button>
                                                        <span> {product.total_count}</span>
                                                        <button className='btn' onClick={() => handleAddCart(key)}> <Plus /></button>
                                                    </div>
                                                </div> : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        )

                    }) : cartproducts.length === 0 ? <span className='no-prod'>No Product Present</span> :
                        <div className="loader">
                            < ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            />
                        </div>

                }
                {
                    price ?
                        <div className="total-price">
                            <span>Total price: </span>
                            <span>{price}</span>
                        </div> : ''
                }
                {
                    cartproducts.length > 0 ?
                        logUser ? <button className='checkout-btn' onClick={() => handleCheckOut(cartproducts)}>Checkout</button> : '' : ''
                }
            </div>

        </div >
    )
}

export default CartProduct