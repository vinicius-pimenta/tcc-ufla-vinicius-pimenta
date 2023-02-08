import Job from '@config/job';
import IMailProvider from '@providers/mail/IMailProvider';

const QUEUE_NAME = 'Mail';

export default class MailJob extends Job {
  private mailProvider: IMailProvider;

  private constructor(mailProvider: IMailProvider) {
    super(QUEUE_NAME);
    this.mailProvider = mailProvider;
  }

  static create(mailProvider: IMailProvider) {
    return new MailJob(mailProvider);
  }

  async handle({ data }: any): Promise<void> {
    await this.mailProvider.sendMail(data);
  }
}
