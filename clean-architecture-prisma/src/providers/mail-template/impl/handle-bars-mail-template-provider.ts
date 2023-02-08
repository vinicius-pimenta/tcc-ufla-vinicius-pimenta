import fs from 'fs';
import handlebars from 'handlebars';
import IGenerateMailTemplateDTO from '../i-generate-mail-template-dto';
import IMailTemplateProvider from '../i-mail-template-provider';

class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  async generate({
    file,
    variables,
  }: IGenerateMailTemplateDTO): Promise<string> {
    const templateFile = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const template = handlebars.compile(templateFile);

    return template(variables ?? {});
  }
}

export default HandlebarsMailTemplateProvider;
