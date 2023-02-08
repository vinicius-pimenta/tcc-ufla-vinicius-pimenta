import IGenerateMailTemplateDTO from './i-generate-mail-template-dto';

export default interface IMailTemplateProvider {
  generate(data: IGenerateMailTemplateDTO): Promise<string>;
}
