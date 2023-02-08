import BullProvider from '@providers/queue/implementations/bull.provider';
import 'dotenv/config';

const worker = new BullProvider().startMessageWorker();

worker.on('completed', (job: any) => {
  console.log(`${`${job.id} ${worker.name}`} has completed!`);
});

worker.on('failed', (job: any, err: any) => {
  console.log(`${`${job.id} ${worker.name}`} has failed with ${err.message}`);
});
