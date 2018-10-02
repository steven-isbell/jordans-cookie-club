import React from 'react';
import Checkout from '../components/Checkout';

const cookies = [
  { id: 1, name: 'Boo Set of 4', price: 15 },
  { id: 2, name: 'Halloween Mickey Set of 3', price: 15 },
  { id: 3, name: 'Hello Fall Set of 3', price: 15 },
];

const cart = () => {
  return cookies.map(cookie => <Checkout cookie={cookie} />);
};

export default cart;
