import React from 'react';
import Checkout from '../components/Checkout';
import './index.css';

const cookies = [
  { id: 1, name: 'Boo \n Set of 4', price: 15, img: 'boo.jpg' },
  { id: 2, name: 'Halloween Mickey \n Set of 3', price: 15, img: null },
  { id: 3, name: 'Hello Fall \n Set of 3', price: 15, img: null },
];

const IndexPage = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {cookies.map(cookie => (
        <Checkout key={cookie.id} cookie={cookie} />
      ))}
    </div>
  );
};

export default IndexPage;
