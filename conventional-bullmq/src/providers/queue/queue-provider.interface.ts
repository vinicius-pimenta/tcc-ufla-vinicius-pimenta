import Job from '@config/job';

export type AddJobInput = {
  job: Job;
  data: any;
};

export default interface IQueueProvider {
  getQueues(): any[];
  addJob(input: AddJobInput): Promise<void>;
  startMessageWorker(): any;
}
