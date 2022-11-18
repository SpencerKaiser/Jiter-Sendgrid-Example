import Sendgrid, { MailDataRequired } from '@sendgrid/mail';

type SendEmailOptions = {
  toEmail?: string;
  subject: string;
  content: string;
};

export const sendEmail = async ({ toEmail, subject, content }: SendEmailOptions) => {
  const payload: MailDataRequired = {
    to: toEmail,
    from: process.env.FROM_EMAIL || 'test@example.com', // Change to your verified sender
    subject,
    text: content,
  };

  try {
    await Sendgrid.send(payload);

    console.info('Email queued');
  } catch (error) {
    console.error('Unable to send email: ', error);
  }
};
