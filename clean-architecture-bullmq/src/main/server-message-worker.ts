import 'dotenv/config';
import { makeQueueProivder } from './factories/queue-provider';

const worker = makeQueueProivder().startMessageWorker();

worker.on('completed', (job: any) => {
  // eslint-disable-next-line no-console
  console.log(`${`${job.id} ${job.name}`} has completed!`);
});

worker.on('failed', (job: any, err: any) => {
  // eslint-disable-next-line no-console
  console.log(`${`${job.id} ${job.name}`} has failed with ${err.message}`);
});
