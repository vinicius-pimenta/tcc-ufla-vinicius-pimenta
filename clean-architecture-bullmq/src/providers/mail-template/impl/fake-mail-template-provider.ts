import IGenerateMailTemplateDTO from '../i-generate-mail-template-dto';
import IMailTemplateProvider from '../i-mail-template-provider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  async generate(data: IGenerateMailTemplateDTO): Promise<string> {
    return 'Template model';
  }
}
