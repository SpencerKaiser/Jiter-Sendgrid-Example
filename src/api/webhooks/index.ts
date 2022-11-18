import { Router } from 'express';
import { groceriesHandler } from './groceriesHandler';
import { remindersHandler } from './remindersHandler';

export const webhooks = Router();

webhooks.use('/groceries', groceriesHandler);
webhooks.use('/reminders', remindersHandler);
