import { Job } from '@main/config/job';

export type AddJobInput = {
  job: Job;
  data: any;
};

export interface IQueueProvider {
  getQueues(): any[];
  addJob(input: AddJobInput): Promise<void>;
  startMessageWorker(): any;
}
