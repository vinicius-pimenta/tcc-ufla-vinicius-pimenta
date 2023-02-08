import mailConfig from 'main/config/mail';
import IMailTemplateProvider from '@providers/mail-template/i-mail-template-provider';
import aws from 'aws-sdk';
import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import IMailProvider from '../i-mail-provider';
import ISendMailDTO from '../i-send-mail-dto';

export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(private mailTemplateProvider: IMailTemplateProvider) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01', // uma boa versão da api da aws
      }),
    });
  }

  async sendMail({ to, subject, template }: ISendMailDTO): Promise<void> {
    const { from } = mailConfig.defaults;
    const content: SendMailOptions = {
      to: {
        name: to.name,
        address: to.email,
      },
      from: {
        name: from.name,
        address: from.email,
      },
      subject,
      html: await this.mailTemplateProvider.generate(template),
    };

    await this.client.sendMail(content);
  }
}
