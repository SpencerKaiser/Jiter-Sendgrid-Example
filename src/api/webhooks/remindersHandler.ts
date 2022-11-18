import Jiter from '@jiter/node';
import { sendEmail } from '../../utils/sendEmail';
import { ReminderEvent } from '../types';

export const remindersHandler = Jiter.Middleware.webhookHandler<ReminderEvent>(
  async ({ payload }) => {
    const toEmail = process.env.TO_EMAIL;
    if (!toEmail) {
      console.error('Unable to send email; TO_EMAIL not set in .env');
      return;
    }

    await sendEmail({
      toEmail,
      subject: 'Scheduled reminder from Jiter',
      content: `Have you purchased your groceries? Here's what you were supposed to buy: ${payload.items.join(
        ', ',
      )}\n\nThis is your one week reminder, which was queued >3 days in advance through the magic of Jiter 🎉`,
    });
  },
  {
    parse: true,
  },
);
