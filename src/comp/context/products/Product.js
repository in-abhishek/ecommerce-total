import React, { useContext, useState } from 'react'
import './product.css';
import TodoContext from '../ContextApi';
import { FallingLines, Hourglass } from 'react-loader-spinner'
import { HeartFill, CaretUpFill, Basket2Fill, Basket, Cart, CartCheckFill } from 'react-bootstrap-icons';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate, Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import CardSkleton from './CardSkleton';
const Product = (props) => {
    const { producid, setProductId, showImage, handleCart, showcart, setShowCart, logUser, handlecartCompare } = useContext(TodoContext);
    const [showM, setShowM] = useState(false);
    const [style, setStyle] = useState(false);
    const [showcompare, setShowCompare] = useState(false);
    const [listItems, setListItems] = useState(9);
    const products = props.data;
    const showDetailedPage = (singleprodId) => {
    }
    const handleCartUpdate = (e, id) => {
        setShowCompare(false)
        handleCart(id);
        setShowCart(true);
    }
    const handleLoadMore = () => {
        if (listItems > products.length) {
            setShowM(true);
        }
        setListItems(listItems + 9);
    }
    const scrollTOTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    const handleCompareId = (id) => {
        handlecartCompare(id);
        setShowCart(true);
        setShowCompare(true)
    }

    return (
        <div>
            {
                logUser ? <h4 className='headingName'>Hello, {logUser}</h4> : ''
            }
            <div className="all-products">
            {/* <CardSkleton products={products} /> */}
                {
                    showcart ?
                        <div className="showcart-pop">
                            {
                                showcompare ? <h3>Product has added to Compare</h3> : <h3>Product has added to Cart</h3>
                            }
                        </div> : ''
                }
                {
                    products.length > 0 ?
                        products.slice(0, listItems).map((product, key) => {
                            console.log("product?.category?.image->>>",product?.category?.image);
                            // products.map((product, key) => {
                            return (
                                <div className="single-product" key={key}>
                                    <div className="single-content-product">
                                        {product.images[0] ?
                                            <div className="product-image">
                                                <div className="imaegs" >
                                                    <Link to={`/single-product/${product.id}`}>
                                                    <img src={product?.category?.image} onClick={() => showDetailedPage(product.id)} alt="" />
                                                        {/* <img src={showImage(product.images[0])} onClick={() => showDetailedPage(product.id)} alt="" /> */}
                                                    </Link>
                                                </div>
                                            </div> : ''
                                        }
                                        <div className="product-content">
                                            {
                                                product.title ?
                                                    <div className="product-title">
                                                        <p>{product.title}</p>
                                                    </div> : ''
                                            }
                                            {
                                                product.description ?
                                                    <div className="product-desc">
                                                        <p>{product.description}</p>
                                                    </div> : ''
                                            }
                                            {
                                                product.price ?
                                                    <div className="product-cat-price">
                                                        <div className="price">
                                                            <span>Price : {product.price}</span>
                                                        </div>
                                                    </div> : ''
                                            }
                                            <div className={`add-cart add-cart-${product.id}`} onClick={(e) => handleCartUpdate(e, product.id)}>
                                                <button className='cartBtn'><CartCheckFill /></button>
                                            </div>
                                            <div className={`add-cart add-cart-compare add-cart-${product.id}`} onClick={() => handleCompareId(product)}>
                                                <button className='cartBtn'><HeartFill /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                        :
                        <CardSkleton data={9} />
                    // <div className="loader">
                    //     <Hourglass
                    //     visible={true}
                    //     height="80"
                    //     width="80"
                    //     ariaLabel="hourglass-loading"
                    //     wrapperStyle={{}}
                    //     wrapperClass=""
                    //     colors={['#306cce', '#72a1ed']}
                    // /> 
                    // </div>

                }
            </div>
            {
                showM ? <button className='scrollTop' onClick={scrollTOTop}><CaretUpFill /></button> : products.length > 0 ? <button type="button" className="showMore" onClick={handleLoadMore}> Show More</button> : ''
            }

        </div>
    )
}

export default Product