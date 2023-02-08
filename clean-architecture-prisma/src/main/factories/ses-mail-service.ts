import SESMailProvider from '@providers/mail/impl/ses-mail-provider';
import { makeHandlebarsMailTemplateProvider } from './handlebars-mail-template-provider';

export const makeSESMailService = (): SESMailProvider => {
  const mailTemplate = makeHandlebarsMailTemplateProvider();
  return new SESMailProvider(mailTemplate);
};
