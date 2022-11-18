import Jiter from '@jiter/node';
import dayjs from 'dayjs';
import { PurchaseEvent } from '../types';
import { sendEmail } from '../../utils/sendEmail';

export const groceriesHandler = Jiter.Middleware.webhookHandler<PurchaseEvent>(
  async ({ payload }) => {
    console.log('Signed, valid Jiter event received');
    // Now that the event was verified and a response was sent, you can continue with the payload:
    if (payload.action === 'buyGroceries') {
      const toEmail = process.env.TO_EMAIL;
      if (!toEmail) {
        console.error('Unable to send email; TO_EMAIL not set in .env');
        return;
      }

      await sendEmail({
        toEmail,
        subject: `Let's stock that fridge...`,
        content: `It's time to buy groceries!\n\nMake sure to pick these items up: ${payload.items.join(
          ', ',
        )}.\n\nYou'll receive a reminder in one week!`,
      });

      // Schedule a reminder for "one week" from now (shortened for demo purposes)
      const oneWeekFromNow = dayjs().add(1, 'minute').toISOString();

      await Jiter.Events.createEvent({
        destination: `${process.env.BASE_URL}/api/webhooks/reminders`,
        payload: JSON.stringify(payload),
        scheduledTime: oneWeekFromNow,
      });

      console.log('Created Jiter event for reminder email');
    } else if (payload.action === 'returnGroceries') {
      const returns = payload.returns.map((item) => `${item.itemName} - ${item.reason}`);
      console.log('Returned the following groceries:', returns);
    }
  },
  { parse: true },
);
