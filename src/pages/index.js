import React from 'react';
import Checkout from '../components/Checkout';

const cookies = [
  { id: 1, name: 'Boo \n Set of 4', price: 15 },
  { id: 2, name: 'Halloween Mickey \n Set of 3', price: 15 },
  { id: 3, name: 'Hello Fall \n Set of 3', price: 15 },
];

const IndexPage = () => {
  return (
    <div>
      {cookies.map(cookie => (
        <Checkout key={cookie.id} cookie={cookie} />
      ))}
    </div>
  );
};

export default IndexPage;
