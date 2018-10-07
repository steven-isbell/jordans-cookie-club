import React, { Component } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import { Button } from '../styledComponents/theme';
import { Container } from '../styledComponents/layout';
import InfoForm from './InfoForm';

const StyledLink = styled(Link)`
  color: rgb(255, 178, 56);
  text-decoration: none;
  cursor: pointer;
`;

class Cart extends Component {
  state = {
    disabled: false,
    buttonText: 'Checkout',
    paymentMessage: '',
    items: [],
    total: 0,
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
    if (items) {
      const total = items.reduce(
        (acc, cur) => (acc += cur.price * cur.quantity),
        0
      );
      this.setState({ items, total });
    }
  }
  handleForm = e => {
    e.preventDefault();
    this.setState({ form: !this.state.form });
  };
  openStripeCheckout = event => {
    event.preventDefault();
    const { total } = this.state;
    this.setState({ disabled: true, buttonText: 'WAITING...', form: false });
    this.stripeHandler.open({
      name: 'Your Cookie Purchase',
      amount: total,
      description: 'Jordans Cookie Club Purchase',
      token: token => {
        fetch(process.env.AWS_LAMBDA_CHECKOUT_URL, {
          method: 'POST',
          body: JSON.stringify({
            token,
            amount: total,
            description: info.description,
          }),
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        })
          .then(res => {
            console.log('Transaction processed successfully');
            this.resetButton();
            this.setState({
              paymentMessage: 'Payment Successful!',
              items: [],
              total: 0,
            });
            localStorage.clear();
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
              <span>{`$${val.price}`.replace('00', '')}</span>
              &nbsp;X&nbsp;
              <span>{val.quantity}</span>
              <hr />
            </div>
          ))}
        </div>
        {this.state.total > 0 && (
          <div>
            <h3>Total {`$${this.state.total}`.replace('00', '')}</h3>
          </div>
        )}
        {this.state.items.length > 0 ? (
          <Button onClick={this.handleForm} disabled={this.state.disabled}>
            {this.state.buttonText}
          </Button>
        ) : (
          <h1>
            Looks like the cart is empty! Start adding items{' '}
            <StyledLink to="/">here!</StyledLink>
          </h1>
        )}
        <p>{this.state.paymentMessage}</p>
        <InfoForm
          handler={this.openStripeCheckout}
          open={this.state.form}
          handleForm={this.handleForm}
        />
      </Container>
    );
  }
}

export default Cart;
