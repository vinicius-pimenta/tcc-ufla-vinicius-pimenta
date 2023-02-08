import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../IMailProvider';
import ISendMailDTO from '../ISendMailDTO';

export default class MailtrapMailProvider implements IMailProvider {
  private transporter: Transporter;

  private mailConfig = {
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'ab6f0f7f180790',
      pass: 'f21e5abf46da54',
    },
  };

  constructor() {
    this.transporter = nodemailer.createTransport(this.mailConfig);
  }

  async sendMail(data: ISendMailDTO): Promise<void> {
    await this.transporter.sendMail({
      from: 'tcc@gmail.com',
      to: data.to.email,
      subject: data.subject,
    });
  }
}
