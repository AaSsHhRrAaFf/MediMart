import React, { useState, useContext, useEffect } from "react";
import { Card, Input, Button } from "antd";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import { v4 as uuidv4 } from "uuid";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.pricePerUnit * item.quantity,
    0
  );

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    if (!stripe || !elements) {
      console.error("Stripe or elements not initialized.");
      return;
    }

    setLoading(true);
    console.log("Payment started");

    try {
      console.log("Creating payment intent...", {
        amount: Math.round(totalPrice * 100),
        currency: "usd",
      });
      const paymentIntentResponse = await api.post(
        "/api/payment/create-payment-intent",
        {
          amount: Math.round(totalPrice * 100),
          currency: "usd",
        }
      );

      if (paymentIntentResponse.status !== 200) {
        console.error(
          "Error creating payment intent. Status:",
          paymentIntentResponse.status
        );
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: `Failed to create payment intent. Status: ${paymentIntentResponse.status}`,
        });
        return;
      }
      const clientSecret = paymentIntentResponse.data.client_secret;
      console.log("client secret:", clientSecret);
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error("Card element not found.");
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Card element not found.",
        });
        return;
      }

      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: document.querySelector('input[name="name"]').value,
            },
          },
        }
      );
      if (error) {
        console.error("Payment failed:", error);
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: error.message,
        });
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        console.log("Payment successful:", paymentIntent);
        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: "Your payment was processed successfully!",
        });
        const paymentData = {
          paymentId: uuidv4(),
          transactionId: paymentIntent.id,
          amount: totalPrice,
          currency: "usd",
          medicineDetails: cartItems.map((item) => ({
            medicineId: item.medicineId,
            quantity: item.quantity,
          })),
        };

        try {
          await api.post("/api/users/payment-history", paymentData);
          console.log("Payment data stored successfully");
          clearCart();
          navigate("/invoice", {
            state: {
              invoiceItems: cartItems,
              totalPrice: totalPrice,
              userName: user?.displayName,
            },
          });
        } catch (error) {
          console.error("Failed to store payment data:", error);
          Swal.fire({
            icon: "error",
            title: "Payment Failed",
            text: "Failed to store payment data.",
          });
        }
      } else {
        console.error(
          "Payment failed, payment intent status is not succeeded.",
          paymentIntent
        );
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Payment failed, payment intent status is not succeeded.",
        });
      }
    } catch (apiError) {
      console.error("API error during payment:", apiError);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text:
          apiError.message ||
          "An error occurred while processing your payment.",
      });
    } finally {
      setLoading(false);
      console.log("Payment process completed");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Card Details
        </label>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name on Card
        </label>
        <Input name="name" placeholder="Enter your name" size="large" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Grand Total
        </label>
        <Input
          placeholder={`$${totalPrice.toFixed(2)}`}
          size="large"
          disabled
        />
      </div>
      <Button
        type="primary"
        size="large"
        block
        loading={loading}
        disabled={loading || !stripe || !elements}
        onClick={handleSubmit}
      >
        Pay with Stripe
      </Button>
    </div>
  );
};

const CheckoutPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!user) {
        navigate("/login");
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </Card>
    </div>
  );
};

export default CheckoutPage;
