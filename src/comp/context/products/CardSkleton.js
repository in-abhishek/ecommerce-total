import React from 'react'
import Skeleton from "react-loading-skeleton";
import './product.css';
const CardSkleton = (props) => {
    const { data } = props
    return (
        <>
            {
                Array(data)
                    .fill().map((product, key) => {
                        // products.map((product, key) => {
                        return (
                            <div className="single-content-product-skelton single-content-product">
                                <div className="product-image">
                                    <div className="imaegs" >
                                        <Skeleton height={230} />
                                    </div>
                                </div>

                                <div className="product-content">
                                    <div className="product-title">
                                        <p><Skeleton /></p>
                                    </div>
                                    <div className="product-desc">
                                        <p><Skeleton count={2}/></p>
                                    </div>
                                    <div className="product-cat-price">
                                        <div className="price">
                                            <span><Skeleton height={30} width={100} /></span>
                                        </div>
                                    </div>
                                    <div className={`add-cart add-cart`} >
                                        <button className='cartBtn cartBtn-skleton'><Skeleton circle={true} height={50} width={50} color='blue' /></button>
                                    </div>
                                    <div className={`add-cart add-cart-compare add-cart`} >
                                        <button className='cartBtn cartBtn-skleton'><Skeleton circle={true} height={50} width={50} color='blue'/></button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
            }
        </>
    )
}

export default CardSkleton