import React, { Component } from 'react';

import { Provider } from '../context/CartContext';

class CartWrapper extends Component {
  state = { cart: [], quantity: 0 };
  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart.length) {
      const quantity = cart.reduce((acc, cur) => (acc += cur.quantity), 0);
      this.setState({ cart, quantity });
    }
  }

  resetCart = () => {
    localStorage.clear();
    this.setState({ cart: [] });
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
    this.setState({ cart, quantity: this.state.quantity + 1 });
  };

  deleteFromCart = id => {
    let items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
      const item = items.find(val => val.id === id);
      const cart = items.filter(val => val.id !== id);
      localStorage.setItem('cart', JSON.stringify(cart));
      this.setState({ cart, quantity: this.state.quantity - item.quantity });
    }
  };

  render() {
    const data = {
      addToCart: this.addToCart,
      deleteFromCart: this.deleteFromCart,
      resetCart: this.resetCart,
      cart: this.state.cart,
      quantity: this.state.quantity,
    };
    return <Provider value={data}>{this.props.children}</Provider>;
  }
}

export default CartWrapper;
