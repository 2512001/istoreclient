import React, { useEffect, useState } from 'react';
import '../styles/Checkout.css';
import { FaCreditCard, FaPaypal } from 'react-icons/fa';
import axios from 'axios';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    paymentMethod: ''
  });

  const [cartItems] = useState([
    { id: "67fd0542e830f92bc2abc4a4", name: 'iphone 15 pro max', price : 120000 ,  quantity: 1 },
  ]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit form');
    
    try {
      // Send the cart items and shipping address to create the order
      const payload = {
        items: cartItems.map((item) => ({
          product: item.id,
          quantity: item.quantity
        })),
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
      };

      // Call the backend to create the Razorpay order
      const { data } = await axios.post("http://localhost:3000/api/orders", payload);
      if (!data.success) return alert("Order creation failed.");

      // Trigger Razorpay payment gateway
      openRazorpayPayment(data);
    } catch (err) {
      console.log('error triggered');
      console.log(err);
      alert("Order failed");
    }
  };

  const openRazorpayPayment = (orderData) => {
    const options = {
      key: "rzp_test_Fz6DFx8JtwyJ66", // Replace with your Razorpay key
      amount: orderData.amount,
      currency: "INR",
      name: "My Store",
      description: "Test Transaction",
      order_id: orderData.orderId,

      handler: async function (response) {
        try {
          // Verify payment after user completes payment
          const verifyRes = await axios.post("http://localhost:3000/api/orders/payment/verify", {
            ...response,
            order_id: orderData.orderId,
          });

          if (verifyRes.data.success) {
            alert("🎉 Payment successful");
          } else {
            alert("❌ Payment failed");
          }
        } catch (err) {
          console.error(err);
          alert("Verification error");
        }
      },

      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <form className="checkout-form">
          <h2>Shipping Information</h2>
          <div className="form-grid">
            {[
              { label: 'First Name', name: 'firstName' },
              { label: 'Last Name', name: 'lastName' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'street', name: 'street' },
              { label: 'City', name: 'city' },
              { label: 'State', name: 'state' },
              { label: 'ZIP Code', name: 'zipCode' }
            ].map(({ label, name, type = 'text' }) => (
              <div className="form-group" key={name}>
                <label htmlFor={name}>{label}</label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              >
                <option value="">Select Country</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>
          </div>

          <h2>Payment Method</h2>
          <div className="payment-methods">
            <div
              className={`payment-method ${formData.paymentMethod === 'credit' ? 'selected' : ''}`}
              onClick={() => setFormData({ ...formData, paymentMethod: 'credit' })}
            >
              <FaCreditCard />
              <span>Credit Card</span>
            </div>
            <div
              className={`payment-method ${formData.paymentMethod === 'paypal' ? 'selected' : ''}`}
              onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
            >
              <FaPaypal />
              <span>PayPal</span>
            </div>
          </div>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <span>{item.name}</span>
                <span>${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total</span>
            <span>${calculateTotal()}</span>
          </div>
          <button type="submit" className="place-order-button" onClick={(e)=>{ handleSubmit(e)}}>
            Place Order
          </button> 
        </div>
      </div>
    </div>
  );
};

export default Checkout;
