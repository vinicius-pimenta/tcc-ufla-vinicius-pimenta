import 'dotenv/config';
import { makeQueueProvider } from './factories/queue-provider';

const worker = makeQueueProvider().startMessageWorker();

worker.on('completed', (job: any) => {
  console.log(`${`${job.id} ${worker.name}`} has completed!`);
});

worker.on('failed', (job: any, err: any) => {
  console.log(`${`${job.id} ${worker.name}`} has failed with ${err.message}`);
});
