import IGenerateMailTemplateDTO from '@providers/mail-template/i-generate-mail-template-dto';

interface IMailContact {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  template: IGenerateMailTemplateDTO;
}
