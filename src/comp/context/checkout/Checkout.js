import React, { useContext, useEffect, useState } from 'react';
import './checkout.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';
import TodoContext from '../ContextApi';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Dash, FileMinus, Plus } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
const Checkout = (props) => {
    const { cartdarta } = props;
    const [showPrice, setShowPrice] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { showImage, price, handleCart } = useContext(TodoContext);
    const stripePromise = loadStripe('pk_test_51Nd7WISFkusGpv4hLPVVKdFespH2A9WvvnQOcXcByt74RDpRoc3VjthOUTucWoFvK5M460WZBBsOsHblnk54PJPw00oQ8cQ9z4');
    const options = {
        mode: 'payment',
        amount: price,
        currency: 'usd',
        appearance: {
            /*...*/
        },
    };
    const handlePrices = (total, price) => {
        return price * total;
    }
    const handleShow=()=>{
        setShowModal(true);
    }
    const handleAdd = (index) => {
        const updatedQuantities = [...quantities];
        updatedQuantities[index] = (updatedQuantities[index] || 0) + 1;
        setQuantities(updatedQuantities);
    }
    const handleSub = (index) => {
        const updatedQuantities = [...quantities];
        if (updatedQuantities[index] > 0) {
            updatedQuantities[index] -= 1;
            setQuantities(updatedQuantities);
        }
    }
    const calculateSubTotal = () => {
        let subTotal = 0;
        cartdarta.forEach((cartdata, index) => {
            subTotal += handlePrices(quantities[index] || cartdata.total_count, cartdata.data.price);
        });
        return subTotal;
    };
    const handleHide = () => {
        setShowModal(false);
      };
    return (
        <>
            <div className="checkout">
                {
                    cartdarta && cartdarta.length > 0 ?
                        <div className='checkout-container'>
                            <h1>CheckOut Page</h1>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>S no.</Th>
                                        <Th>Product image</Th>
                                        <Th>Product Name</Th>
                                        <Th>Price</Th>
                                        <Th>Number of Product</Th>
                                        <Th>Total price of Single Product</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        cartdarta.map((cartdata, index) => {
                                            return (
                                                <Tr className='checkout-body' key={index}>
                                                    <Td>{index + 1}</Td>
                                                    {
                                                        cartdata.data.images[0] ?
                                                            <div className="product-images">
                                                                <div className="imaegss">
                                                                    <img src={showImage(cartdata.data.images[0])} alt="" />
                                                                </div>
                                                            </div> : ''
                                                    }
                                                    {
                                                        cartdata.data.title ?
                                                            <Td className="product-title">
                                                                <p>{cartdata.data.title}</p>
                                                            </Td> : ''
                                                    }
                                                    {
                                                        cartdata.data.price ?
                                                            <Td className="price">
                                                                <span>{cartdata.data.price}</span>
                                                            </Td>
                                                            : ''
                                                    }
                                                    <Td className="price">
                                                        <div className="total_count">
                                                            <span onClick={() => handleSub(index)}><Dash /></span>
                                                            <span>{quantities[index] || cartdata.total_count}</span>
                                                            <span onClick={() => handleAdd(index)}><Plus /></span>
                                                        </div>
                                                    </Td>
                                                    {cartdata.total_count && cartdata.data.price ?
                                                        <Td className="total-prices">
                                                            <span>{handlePrices(quantities[index] || cartdata.total_count, cartdata.data.price)}</span>
                                                        </Td> : ''
                                                    }
                                                </Tr>
                                            )
                                        })
                                    }

                                </Tbody>
                            </Table>
                            <div>
                                <div className="show-total">
                                    <span>Sub Total:</span>
                                    <span>{calculateSubTotal()}</span>
                                </div>
                                <div className="show-total">
                                    <span>GST (18%:) </span>
                                    <span>{calculateSubTotal() * 0.18}</span>
                                </div>
                                <div className="show-total">
                                    <span>Total Price after GST: </span>
                                    <span>{calculateSubTotal() + calculateSubTotal() * 0.18}</span>
                                </div>
                            </div>
                            <div className="showCheckOut">
                                <button className='showCheckOutBtn' onClick={handleShow}>Proceed To Payment</button>
                            </div>
                        </div> : ''
                }
            </div>

            <Elements stripe={stripePromise} options={options}>
                <CheckOutForm show={showModal} onHide={handleHide} />
            </Elements>

        </>
    )
}

export default Checkout