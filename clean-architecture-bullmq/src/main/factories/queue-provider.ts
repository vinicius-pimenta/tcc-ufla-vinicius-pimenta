import { BullmqProvider } from '@providers/queue/implementations/bullmq.provider';
import { IQueueProvider } from '@providers/queue/queue-provider.interface';

export const makeQueueProivder = (): IQueueProvider => {
  return new BullmqProvider();
};
