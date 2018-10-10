import React, { Component } from 'react';

class InfoForm extends Component {
  state = { name: '', email: '', description: '', address: '' };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  submitForm = async () => {
    const { name, email, description, address } = this.state;
    const response = await fetch(process.env.AWS_LAMBDA_EMAIL_URL, {
      method: 'POST',
      body: JSON.stringify({
        name,
        email,
        description,
        address,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });
    console.log(response);
  };
  render() {
    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          background: 'black',
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '12px',
          color: '#fff',
          fontFamily: 'georgia, serif',
          display: this.props.open ? 'block' : 'none',
        }}
      >
        <form
          onSubmit={this.props.handler}
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: screen.width > 500 ? '25%' : '100%',
            margin: screen.width > 500 ? '100px auto' : 0,
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <label>Name:</label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
          </div>
          <br />
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <label>Email:</label>
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            />
          </div>
          <br />

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <label>Address:</label>
            <input
              type="text"
              value={this.state.address}
              onChange={this.handleChange}
              name="address"
            />
          </div>
          <br />

          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <label>Description:</label>
            <textarea
              type="text"
              value={this.state.description}
              onChange={this.handleChange}
              name="description"
              placeholder="Custom instructions, cookie types, etc"
            />
          </div>

          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <input
              type="submit"
              value="Submit"
              style={{
                fontSize: '16px',
                textAlign: 'center',
                color: '#fff',
                outline: 'none',
                padding: '12px',
                boxShadow: '2px 5px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgb(255, 178, 56)',
                borderRadius: '6px',
                letterSpacing: '1.5px',
              }}
            />
            <button
              style={{
                fontSize: '16px',
                textAlign: 'center',
                color: '#fff',
                outline: 'none',
                padding: '12px',
                boxShadow: '2px 5px 10px rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgb(255, 19, 28)',
                borderRadius: '6px',
                letterSpacing: '1.5px',
              }}
              onClick={this.props.handleForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default InfoForm;
