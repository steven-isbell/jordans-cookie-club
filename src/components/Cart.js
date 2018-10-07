import React, { Component } from 'react';

class Cart extends Component {
  resetButton() {
    this.setState({ disabled: false, buttonText: 'BUY NOW' });
  }

  componentDidMount() {
    this.stripeHandler = StripeCheckout.configure({
      key: process.env.STRIPE_API_KEY,
      closed: () => {
        this.resetButton();
      },
    });
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
    const nameParts = this.props.cookie.name.split('\n');
    return (
      <div style={cardStyles}>
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
        <button
          style={buttonStyles}
          onClick={event => this.openStripeCheckout(event)}
          disabled={this.state.disabled}
        >
          {this.state.buttonText}
        </button>
        {this.state.paymentMessage}
      </div>
    );
  }
}

export default Cart;
