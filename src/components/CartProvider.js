import React, { Component } from 'react';

import { Provider } from '../context/CartContext';

class CartWrapper extends Component {
  state = { cart: [] };
  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart.length) {
      this.setState({ cart });
    }
  }

  resetCart = () => {
    localStorage.clear();
  };

  addToCart = item => {
    let cart = [];
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      cart = [...items];
      const matched = cart.find(val => val.id === item.id);
      if (matched) {
        matched.quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    this.setState({ cart });
  };

  deleteFromCart = id => {
    let items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      const cart = items.filter(val => val.id !== id);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.setState({ cart });
    }
  };

  render() {
    const data = {
      addToCart: this.addToCart,
      deleteFromCart: this.deleteFromCart,
      resetCart: this.resetCart,
      cart: this.state.cart,
    };
    return <Provider value={data}>{this.props.children}</Provider>;
  }
}

export default CartWrapper;
