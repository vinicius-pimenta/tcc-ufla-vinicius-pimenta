import ISendMailDTO from './i-send-mail-dto';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
