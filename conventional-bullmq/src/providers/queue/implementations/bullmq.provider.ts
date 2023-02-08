import { Queue, Worker } from 'bullmq';

import MailtrapMailProvider from '@providers/mail/impl/MailtrapMailProvider';
import MailJob from '../mail-job';

import IQueueProvider, { AddJobInput } from '../queue-provider.interface';

const MAXIMUM_TIME_IN_SECONDS_FOR_JOB_TO_BE_KEPT_TO_REMOVE_ON_COMPLETE = 3600;
const MAXIMUM_TIME_IN_SECONDS_FOR_JOB_TO_BE_KEPT_TO_REMOVE_ON_FAIL =
  15 * 24 * 3600;
const MAXIMUM_COUNT_OF_JOBS_TO_BE_KEPT = 1000;

export default class BullmqProvider implements IQueueProvider {
  private queues: Queue[] = [];

  constructor() {
    const messageQueue = new Queue('Mail', {
      connection: { host: 'localhost', port: 6379 },
      defaultJobOptions: {
        removeOnComplete: {
          age: MAXIMUM_TIME_IN_SECONDS_FOR_JOB_TO_BE_KEPT_TO_REMOVE_ON_COMPLETE,
          count: MAXIMUM_COUNT_OF_JOBS_TO_BE_KEPT,
        },
        removeOnFail: {
          age: MAXIMUM_TIME_IN_SECONDS_FOR_JOB_TO_BE_KEPT_TO_REMOVE_ON_FAIL,
        },
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000,
        },
      },
    });

    this.queues.push(messageQueue);
  }

  getQueues() {
    return this.queues;
  }

  async addJob({ job, data }: AddJobInput) {
    const queue = this.queues.find(item => item.name === job.queueName);

    if (queue) queue.add(job.queueName, data);
  }

  startMessageWorker() {
    const mailJob = MailJob.create(new MailtrapMailProvider());

    const mailWorker = new Worker(
      mailJob.queueName,
      mailJob.handle.bind(mailJob),
      {
        connection: { host: 'localhost', port: 6379 },
        concurrency: 100,
        limiter: {
          max: 400,
          duration: 1000,
        },
      },
    );
    return mailWorker;
  }
}
