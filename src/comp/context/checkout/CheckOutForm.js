import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Modal, Button } from 'react-bootstrap';
const CheckOutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (elements == null) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const res = await fetch('/create-intent', {
      method: 'POST',
    });

    const { client_secret: clientSecret } = await res.json();

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: 'https://example.com/order/123/complete',
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
    }
  };
  return (
    <>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title>PayMent Details:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='paymentForm'><form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" className='checout-btn' disabled={!stripe || !elements}>
              Proceed to Order
            </button>
          </form></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default CheckOutForm