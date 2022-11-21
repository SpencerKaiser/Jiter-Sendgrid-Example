import { BuyGroceriesEvent } from './groceries';

export type ReminderEvent = Pick<BuyGroceriesEvent, 'items'> & { toEmail: string };
