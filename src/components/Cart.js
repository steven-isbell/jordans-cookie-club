import React, { Component } from 'react';

import { Button } from '../styledComponents/theme';
import { Container } from '../styledComponents/layout';

class Cart extends Component {
  state = {
    disabled: false,
    buttonText: 'Checkout',
    paymentMessage: '',
    items: [],
  };
  resetButton() {
    this.setState({
      disabled: false,
      buttonText: 'Checkout',
      paymentMessage: '',
    });
  }

  componentDidMount() {
    this.stripeHandler = StripeCheckout.configure({
      key: process.env.STRIPE_API_KEY,
      closed: () => {
        this.resetButton();
      },
    });
    const items = JSON.parse(localStorage.getItem('cart'));
    console.log(items);
    if (items) {
      this.setState({ items });
    }
  }

  openStripeCheckout = event => {
    event.preventDefault();
    this.setState({ disabled: true, buttonText: 'WAITING...' });
    this.stripeHandler.open({
      name: this.props.cookie.name,
      amount: this.props.cookie.price,
      description: 'Jordans Cookie Club Purchase',
      token: token => {
        fetch(process.env.AWS_LAMBDA_CHECKOUT_URL, {
          method: 'POST',
          body: JSON.stringify({
            token,
            amount: this.props.cookie.price,
            description: this.props.cookie.name,
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        })
          .then(res => {
            console.log('Transaction processed successfully');
            this.resetButton();
            this.setState({ paymentMessage: 'Payment Successful!' });
            return res.json();
          })
          .catch(error => {
            console.error('Error:', error);
            this.setState({ paymentMessage: 'Payment Failed' });
          });
      },
    });
  };

  render() {
    return (
      <Container>
        <div>
          {this.state.items.map(val => (
            <div key={val.id}>
              <h1>{val.name}</h1>
              <span>{val.price}</span>X<span>{val.quantity}</span>
            </div>
          ))}
        </div>
        <Button
          onClick={event => this.openStripeCheckout(event)}
          disabled={this.state.disabled}
        >
          {this.state.buttonText}
        </Button>
        {this.state.paymentMessage}
      </Container>
    );
  }
}

export default Cart;
