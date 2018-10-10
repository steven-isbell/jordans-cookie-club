const sgMail = require('@sendgrid/mail');

const { SENDGRID_KEY, CONTACT_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

module.exports.handler = async (event, context, callback) => {
  const { name, email, description, address } = JSON.parse(event.body);

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  const config = {
    from: `${name} <${email}>`,
    to: CONTACT_EMAIL,
    subject: 'New Cookie Order',
    text: `Message: ${message}, Desc: ${description}, Address: ${address}`,
  };

  try {
    await sgMail.send(config);
    const response = {
      headers,
      statusCode: 200,
      body: JSON.stringify({
        message: `Charge processed!`,
        charge,
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
