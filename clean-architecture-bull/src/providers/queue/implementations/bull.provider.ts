import Queue from 'bull';

import { MailtrapMailProvider } from '@providers/mail/impl/mailtrap-mail-provider';
import { AddJobInput, IQueueProvider } from '../queue-provider.interface';
import { MailJob } from '../mail-job';

export class BullProvider implements IQueueProvider {
  private queue: any;

  constructor() {
    this.queue = {
      bull: new Queue('Mail', { redis: { host: 'localhost', port: 6379 } }),
    };
  }

  getQueues() {
    return this.queue;
  }

  async addJob({ job, data }: AddJobInput) {
    this.queue.bull.add(data);
  }

  startMessageWorker() {
    const mailProvider = new MailtrapMailProvider();
    const mailJob = MailJob.create(mailProvider);

    this.queue.bull.process(mailJob.handle.bind(mailJob));
    return this.queue.bull;
  }
}
