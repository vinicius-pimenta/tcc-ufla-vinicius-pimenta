import ISendMailDTO from '../i-send-mail-dto';
import IMailProvider from '../i-mail-provider';

export default class FakeMailProvider implements IMailProvider {
  private mails: ISendMailDTO[] = [];

  async sendMail(data: ISendMailDTO): Promise<void> {
    this.mails.push(data);
  }
}
