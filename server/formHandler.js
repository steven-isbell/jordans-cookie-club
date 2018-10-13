const sgMail = require('@sendgrid/mail');

const { SENDGRID_KEY, CONTACT_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

module.exports.handler = async (event, context, callback) => {
  const { name, email, description, address, items, stripeID } = JSON.parse(
    event.body
  );

  const parsedItems = items.map(val => val.name).join(', ');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const config = {
    from: `${name} <${email}>`,
    to: CONTACT_EMAIL,
    subject: 'New Cookie Order',
    text: `Description: ${description}, Address: ${address}, Items Ordered: ${parsedItems}, Stripe Charge ID: ${stripeID}`,
  };

  try {
    await sgMail.send(config);
    const response = {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        message: `Success!`,
      }),
    };
    callback(null, response);
  } catch (e) {
    console.log(JSON.stringify(e));
    const response = {
      headers,
      statusCode: 500,
      body: JSON.stringify({
        error: e.message,
      }),
    };
    callback(null, response);
  }
};
