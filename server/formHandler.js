const sgMail = require('@sendgrid/mail');

const { SENDGRID_KEY, CONTACT_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

module.exports.handler = (event, context, callback) => {
  const { name, email, description, address } = JSON.parse(event.body);

  const config = {
    from: `${name} <${email}>`,
    to: CONTACT_EMAIL,
    subject: 'New Cookie Order',
    text: `Message: ${message}, Desc: ${description}, Address: ${address}`,
  };
  sgMail.send(config);
};
