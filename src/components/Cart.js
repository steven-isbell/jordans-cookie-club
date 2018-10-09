import React, { Component } from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components';

import { Button } from '../styledComponents/theme';
import { Container } from '../styledComponents/layout';
import InfoForm from './InfoForm';
import { Consumer } from '../context/CartContext';

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
  }
  getTotal(items) {
    return items.reduce((acc, cur) => (acc += cur.price * cur.quantity), 0);
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
      <Consumer>
        {({ deleteFromCart, cart }) => (
          <Container>
            <div>
              {cart.map(val => (
                <div key={val.id}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <h2>{val.name}</h2>
                      <span>{`$${val.price}`.replace('00', '')}</span>
                      &nbsp;X&nbsp;
                      <span>{val.quantity}</span>
                    </div>
                    <div onClick={() => deleteFromCart(val.id)}>
                      <h3 style={{ cursor: 'pointer' }}> &#128465;</h3>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            <div>
              {this.getTotal(cart) ? (
                <h3>Total {`$${this.getTotal(cart)}`.replace('00', '')}</h3>
              ) : null}
            </div>
            {cart.length > 0 ? (
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
        )}
      </Consumer>
    );
  }
}

export default Cart;
