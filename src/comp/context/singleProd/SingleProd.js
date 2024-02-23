import React, { useContext, useEffect, useState } from 'react'
import './single-prod.css';
import { Routes, Route, useParams, useNavigate, Link } from 'react-router-dom';
import TodoContext from '../ContextApi';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Audio } from 'react-loader-spinner'
import { CartCheckFill, Dash, HeartFill, Plus } from 'react-bootstrap-icons';
import CardSkleton from '../products/CardSkleton';
const SingleProd = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [categorydata, setCategoryData] = useState([]);
    const [showcompare, setShowCompare] = useState(false);
    const [singleCount, setSIngleCount] = useState(0);
    const [show, setShow] = useState(false);
    const { producid, showImage, handleCart, setShowCart, setProductId, showcart, compareData, setCompareData, handlecartCompare } = useContext(TodoContext);
    const navigate = useNavigate();
    useEffect(() => {
        getData(`https://api.escuelajs.co/api/v1/products/${id}`);
        // getCategoryData(`https://api.escuelajs.co/api/v1/categories/${id}/products`);
    }, [id]);
    const getData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const getMovieData = await response.json();
            setData(getMovieData);
            setShow(true);
        } catch (error) {
            console.log(error);
        }
    }
    const removeSinglePage = () => {
        setShow(!show);
        navigate(`/`);
    }
    const handleCartUpdate = (e, id) => {
        setShowCompare(false)
        handleCart(id);
        setShowCart(true);
    }
    const getCategoryData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const getCategoryData = await response.json();
            setCategoryData(getCategoryData);
            setShow(true);
        } catch (error) {
            console.log(error);
        }
    }
    if (data) {
        getCategoryData(`https://api.escuelajs.co/api/v1/categories/${data?.category?.id}/products`);
    }


    const handleproductAdd = (id) => {
        handleCart(id);
        setSIngleCount(singleCount + 1);
        setShowCart(true);
    }
    const handleCartCompare = (items) => {
        handlecartCompare(items)
        setShowCart(true);
        setShowCompare(true)
    }
    const handleAddCart = (id) => {
        handleCart(id);
        setSIngleCount(singleCount + 1);
    }
    const handleSubCart = () => {
        const updatedProductIds = producid.slice(0, producid.length - 1);
        setProductId(updatedProductIds);
        if (singleCount > 0) {
            setSIngleCount(singleCount - 1);
        }
    }
    console.log("data->>>", data);
    // setCompareData([...compareData,data]);
    return (
        <>
            {
                show ?
                    data ?
                        <>
                            <div className='single-prod'>
                                {
                                    showcart ?
                                        <div className="showcart-pop">
                                            {
                                                showcompare ? <h3>Product has added to Compare</h3> : <h3>Product has added to Cart</h3>
                                            }
                                        </div> : ''
                                }
                                <div className="single-page">
                                    <div className="single-page-cross" onClick={removeSinglePage}></div>
                                    <div className="container">
                                        <div className="col-6">
                                            {
                                                data.images ?
                                                    <div className="image">
                                                        <img src={showImage(data.images[0])} alt="" />
                                                    </div> : ''
                                            }
                                        </div>
                                        <div className="col-6">
                                            <div className="right-container">
                                                <div className="text-container">
                                                    {
                                                        data.title ?
                                                            <h1>{data.title}</h1> : ''
                                                    }
                                                </div>
                                                <div className="category">
                                                    {
                                                        data.category?.name ?
                                                            <span>category: <h3>{data.category?.name}</h3></span> : ''
                                                    }
                                                </div>
                                                <div className="description">
                                                    {
                                                        data.description ?
                                                            <p>{data.description}</p> : ''
                                                    }
                                                </div>
                                                <div className="price">
                                                    {
                                                        data.price ?
                                                            <h4>price: ${data.price}</h4> : ''
                                                    }
                                                </div>
                                                {/* <div className="show-cart">
                                                    <button className='btn' onClick={() => handleSubCart(data.id)}> <Dash /></button>
                                                    <span className='length'>{ }</span>
                                                    <button className='btn' onClick={() => handleAddCart(data.id)}> <Plus /></button>
                                                </div> */}
                                                {
                                                    showcart ?
                                                        <button className='single-page-cart' onClick={() => handleproductAdd(data.id)} disabled>Add To Cart</button>
                                                        :
                                                        <button className='single-page-cart' onClick={() => handleproductAdd(data.id)} >Add To Cart</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="related-heading">
                                <h1>Related Products</h1>
                            </div>
                            <Swiper
                                breakpoints={{
                                    1024: {
                                        slidesPerView: 3,
                                    },
                                    580: {
                                        slidesPerView: 2,
                                    },
                                    468: {
                                        slidesPerView: 1,
                                    },
                                }}
                                spaceBetween={50}

                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                {
                                    categorydata.length > 0 ?
                                        categorydata.map((items, key) => {
                                            return (
                                                <SwiperSlide key={key}>
                                                    <div className="single-category">
                                                        {
                                                            items.images[0] ?
                                                                <div className="images">
                                                                    <Link to={`/single-product/${items.id}`}> <img src={showImage(items.images[0])} alt="" /></Link>
                                                                </div> : ''
                                                        }
                                                        {
                                                            items.title ? <h3>{items.title}</h3> : ''
                                                        }
                                                        {
                                                            items.description ? <div className="product-desc">
                                                                <p>{items.description}</p>
                                                            </div> : ''
                                                        }
                                                        {
                                                            items.price ?
                                                                <div className="product-cat-price">
                                                                    <div className="price">
                                                                        <span>Price : {items.price}</span>
                                                                    </div>
                                                                </div> : ''
                                                        }
                                                        {/* onClick={(e) => handleCartUpdate(e, items.id)} */}
                                                        <div className={`add-cart add-cart-${items.id}`} onClick={(e) => handleCartUpdate(e, items.id)}>
                                                            <button className='cartBtn'><CartCheckFill /></button>
                                                        </div>
                                                        <div className={`add-cart add-cart-compare add-cart-${items.id}`} onClick={() => handleCartCompare(items)}>
                                                            <button className='cartBtn'><HeartFill /></button>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            );
                                        })
                                        :
                                        <div className="all-products">
                                            <CardSkleton data={3} />
                                        </div>
                                }
                            </Swiper>
                        </>
                        : 'No product Found' :
                    <div className="loader"><Audio
                        height="100"
                        width="100"
                        color="#4fa94d"
                        ariaLabel="audio-loading"
                        wrapperStyle={{}}
                        wrapperClass="wrapper-class"
                        visible={true}
                    />
                    </div>
            }
        </>
    )
}

export default SingleProd