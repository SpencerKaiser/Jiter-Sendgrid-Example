import { createEvent } from '@jiter/node';
import dayjs from 'dayjs';
import { Handler } from 'express';
import { sendEmail } from '../../utils/sendEmail';
import { ReminderEvent } from '../types';

/**
 * Express handler for POST /api/events
 * Used to create new events
 */
export const post: Handler = async (req, res) => {
  try {
    const toEmail = process.env.TO_EMAIL;
    if (!toEmail) {
      res.status(500).send('Unable to send email; TO_EMAIL not set in .env');
      return;
    }

    const payload: ReminderEvent = {
      toEmail,
      items: ['eggs', 'bacon', 'pasta', 'bread'],
    };

    await sendEmail({
      toEmail,
      subject: `Let's stock that fridge...`,
      content: `It's time to buy groceries!\n\nMake sure to pick these items up: ${payload.items.join(
        ', ',
      )}.`,
    });

    // Schedule a reminder for "one week" from now (shortened for demo purposes)
    const oneWeekFromNow = dayjs().add(1, 'minute').toISOString();

    // See https://docs.jiter.dev/create-an-event
    const createdEvent = await createEvent({
      destination: `${process.env.BASE_URL}/api/webhooks/reminders`,
      payload: JSON.stringify(payload),
      scheduledTime: oneWeekFromNow,
    });

    console.log('Created Jiter event for reminder email');

    res.send(createdEvent);
  } catch (error: any) {
    console.error(error);
    const { message } = error.response.data;
    res.status(500).json({ message });
  }
};
