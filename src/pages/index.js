import React from 'react';

import Checkout from '../components/Checkout';
import { Consumer } from '../context/CartContext';

import './index.css';

const cookies = [
  { id: 1, name: 'Boo \n Set of 4', price: 1500, img: 'boo.jpg' },
  {
    id: 2,
    name: 'Halloween Mickey \n Set of 3',
    price: 1500,
    img: 'mickey.jpg',
  },
  { id: 3, name: 'Hello Fall \n Set of 3', price: 1500, img: 'fall.jpg' },
  { id: 4, name: 'Custom \n Set of 3', price: 1500, img: 'custom.jpg' },
];

const IndexPage = () => {
  return (
    <Consumer>
      {({ addToCart }) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          {cookies.map(cookie => (
            <Checkout key={cookie.id} cookie={cookie} addToCart={addToCart} />
          ))}
        </div>
      )}
    </Consumer>
  );
};

export default IndexPage;
