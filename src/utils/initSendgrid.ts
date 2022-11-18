import Sendgrid from '@sendgrid/mail';

// Initialize the Sendgrid SDK
export const initSendgrid = () => {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  if (!sendgridApiKey) {
    console.error('Unable to initialize Sendgrid');
  } else {
    Sendgrid.setApiKey(sendgridApiKey);
  }
};
