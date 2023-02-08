import { container } from 'tsyringe';
import BullMqProvider from './implementations/bullmq.provider';
import IQueueProvider from './queue-provider.interface';

container.registerSingleton<IQueueProvider>('QueueProvider', BullMqProvider);
