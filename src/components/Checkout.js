import React, { Component } from 'react';
import styled from 'styled-components';

import { Button } from '../styledComponents/theme';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding: 3rem;
  box-shadow: 5px 5px 25px 0 rgba(46, 61, 73, 0.2);
  background-color: #fff;
  border-radius: 6px;
  margin: 25px;
  flex-basis: 350px;
`;

class Checkout extends Component {
  state = {
    buttonText: 'Add To Cart',
  };

  addToCart = item => {
    let newItems = [];
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      newItems = [...items];
      const matched = newItems.find(val => val.id === item.id);
      if (matched) {
        matched.quantity += 1;
      } else {
        newItems.push({ ...item, quantity: 1 });
      }
    } else {
      newItems.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  render() {
    const nameParts = this.props.cookie.name.split('\n');
    return (
      <Card>
        <div
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h4>{nameParts[0]}</h4>
          <p>{`$${this.props.cookie.price}`.replace('00', '')}</p>
        </div>
        <p>{nameParts[1]}</p>
        {this.props.cookie.img && (
          <img src={require(`../assets/${this.props.cookie.img}`)} />
        )}
        <Button
          style={{ cursor: 'pointer' }}
          onClick={() => this.props.addToCart(this.props.cookie)}
        >
          {this.state.buttonText}
        </Button>
        {this.state.paymentMessage}
      </Card>
    );
  }
}

export default Checkout;
