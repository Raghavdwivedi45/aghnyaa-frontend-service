import React from 'react';
import styles from './page.module.scss';
import { fetchDonationOptions } from '@/utils/userAPIs';
import { convertPaiseToRupee } from '@/utils/helperFunctions';
import PaymentButton from '@/components/Payment/Payment';
import { connection } from 'next/server';

const page = async () => {
  await connection();
  const donationOptions = await fetchDonationOptions();

  return (
    <div className={styles['support-card-container']}>
      {Object.entries(donationOptions)?.map(([paymentType, amount]) => (
        <div key={paymentType} className={styles['support-card']}>
          <p>{paymentType}</p>
          <p>Rs. {convertPaiseToRupee(amount)}</p>
          <PaymentButton paymentType={paymentType} amount={amount} />
        </div>
      ))}
    </div>
  );
};

export default page;
