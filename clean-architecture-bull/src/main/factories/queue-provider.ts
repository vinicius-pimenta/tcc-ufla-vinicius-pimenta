import { BullProvider } from '@providers/queue/implementations/bull.provider';
import { IQueueProvider } from '@providers/queue/queue-provider.interface';

export const makeQueueProvider = (): IQueueProvider => {
  return new BullProvider();
};
