import { Router } from 'express';
import { remindersHandler } from './remindersHandler';

export const webhooks = Router();

webhooks.use('/reminders', remindersHandler);
