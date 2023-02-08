import BullmqProvider from '@providers/queue/implementations/bullmq.provider';
import 'dotenv/config';

const worker = new BullmqProvider().startMessageWorker();

worker.on('completed', (job: any) => {
  console.log(`${`${job.id} ${worker.name}`} has completed!`);
});

worker.on('failed', (job: any, err: any) => {
  console.log(`${`${job.id} ${worker.name}`} has failed with ${err.message}`);
});
