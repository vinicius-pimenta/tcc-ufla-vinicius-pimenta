import HandlebarsMailTemplateProvider from '@providers/mail-template/impl/handle-bars-mail-template-provider';

export const makeHandlebarsMailTemplateProvider =
  (): HandlebarsMailTemplateProvider => {
    return new HandlebarsMailTemplateProvider();
  };
