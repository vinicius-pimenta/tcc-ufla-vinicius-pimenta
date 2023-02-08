export default abstract class Job {
  public readonly queueName: string;

  protected constructor(queueName: string) {
    this.queueName = queueName;
  }

  abstract handle({ data }: any): Promise<void>;
}
