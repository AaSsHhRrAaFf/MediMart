// Import necessary libraries
import React from 'react';
import { Card, Input, Button } from 'antd';
import 'antd/dist/reset.css'; // Ant Design styles
import 'tailwindcss/tailwind.css'; // Tailwind styles

const CheckoutPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Checkout</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Card Details</label>
            <Input placeholder="Enter your card details" size="large" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
            <Input placeholder="Enter your name" size="large" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Grand Total</label>
            <Input placeholder="$99.99" size="large" disabled />
          </div>
          <Button type="primary" size="large" block>
            Pay with Stripe
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CheckoutPage;
