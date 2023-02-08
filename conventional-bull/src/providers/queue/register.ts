import { container } from 'tsyringe';
import BullProvider from './implementations/bull.provider';
import IQueueProvider from './queue-provider.interface';

container.registerSingleton<IQueueProvider>('QueueProvider', BullProvider);
