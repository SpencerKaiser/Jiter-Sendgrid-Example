import Jiter from '@jiter/node';
import { sendEmail } from '../../utils/sendEmail';
import { ReminderEvent } from '../types';

export const remindersHandler = Jiter.Middleware.webhookHandler<ReminderEvent>(
  async ({ payload }) => {
    const { items, toEmail } = payload;

    await sendEmail({
      toEmail,
      subject: 'Scheduled reminder from Jiter',
      content: `You purchased groceries a week ago... Need to restock yet?\n\nHere's what you bought last time: ${items.join(
        ', ',
      )}\n\nThis is your one week reminder, which was queued >3 days in advance through the magic of Jiter 🎉`,
    });
  },
  {
    parse: true,
  },
);
