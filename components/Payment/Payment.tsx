'use client';

import { ToasterContext } from '@/contexts/ToasterContext';
import { URLGenerator } from '@/utils/helperFunctions';
import { createPayment } from '@/utils/userAPIs.client';
import { useMutation } from '@tanstack/react-query';
import Script from 'next/script';
import React, { useContext, useState } from 'react';
import ButtonSet from '../ButtonSet/ButtonSet';

type RazorpayCheckoutOptions = {
  key: string;
  amount: string;
  currency: string;
  name: string;
  order_id: string;
  callback_url: string;
  theme: { color: string };
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => { open: () => void };
  }
}

const PaymentButton = ({ paymentType, amount }: { paymentType: string; amount: number | string }) => {
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const { setErrorList } = useContext(ToasterContext);

  const paymentMutation = useMutation({
    mutationFn: createPayment,
    onSuccess: ({ data, status, message }) => {
      if (status !== 200 || !data?.id || !data.razorpay_public_key) {
        setErrorList(message || 'Payment could not be started. Please try again.');
        return;
      }

      if (!razorpayLoaded || !window.Razorpay) {
        setErrorList('Payment checkout is still loading. Please try again.');
        return;
      }

      const checkout = new window.Razorpay({
        key: data.razorpay_public_key,
        amount: data.amount,
        currency: data.currency,
        name: 'Aghnyaa',
        order_id: data.id,
        callback_url: URLGenerator('USER', '/protected/v1/payment/auth/verify-payment'),
        theme: { color: '#3399cc' },
      });

      checkout.open();
    },
    onError: (error) => {
      setErrorList(error instanceof Error ? error.message : 'Payment creation failed.');
    },
  });

  const handlePayment = () => {
    if (!razorpayLoaded || !window.Razorpay) {
      setErrorList('Payment checkout is still loading. Please try again.');
      return;
    }

    paymentMutation.mutate({ paymentType, amount });
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onReady={() => setRazorpayLoaded(true)}
        onError={() => {
          setRazorpayLoaded(false);
          setErrorList('Failed to load Razorpay checkout. Please try again later.');
          console.error('Failed to load Razorpay checkout script');
        }}
      />
      <ButtonSet
        primaryText="Pay now"
        onPrimaryClick={handlePayment}
        disablePrimary={paymentMutation.isPending}
      />
    </>
  );
};

export default PaymentButton;
