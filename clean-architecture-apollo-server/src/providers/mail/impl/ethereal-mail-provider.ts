import IMailTemplateProvider from '@providers/mail-template/i-mail-template-provider';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailProvider from '../i-mail-provider';
import ISendMailDTO from '../i-send-mail-dto';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  }

  async sendMail({ to, from, subject, template }: ISendMailDTO): Promise<void> {
    const content: SendMailOptions = {
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from?.name ?? 'Equipe GoBarber',
        address: from?.email ?? 'equipe@gobarber.com.br',
      },
      subject,
      html: await this.mailTemplateProvider.generate(template),
    };

    const message = await this.client.sendMail(content);

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
