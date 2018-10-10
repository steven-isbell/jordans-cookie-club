const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  // Pull out the amount and id for the charge from the POST
  const requestData = JSON.parse(event.body);
  const amount = requestData.amount;
  const token = requestData.token.id;
  const description = requestData.description;

  // Headers to prevent CORS issues
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  return stripe.charges
    .create({
      // Create Stripe charge with token
      amount,
      source: token,
      currency: 'usd',
      description,
    })
    .then(charge => {
      // Success response
      const response = {
        headers,
        statusCode: 200,
        body: JSON.stringify({
          message: `Charge processed!`,
          charge,
        }),
      };
      callback(null, response);
    })
    .catch(err => {
      // Error response
      console.log(err);
      const response = {
        headers,
        statusCode: 500,
        body: JSON.stringify({
          error: err.message,
        }),
      };
      callback(null, response);
    });
};
