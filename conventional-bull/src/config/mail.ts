interface MailDriver {
  driver: 'ethereal' | 'ses' | 'mailtrap';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'mailtrap',

  defaults: {
    from: {
      name: 'Leonardo | Equipe GoBarber',
      email: 'admin@leonardobraz.xyz',
    },
  },
} as MailDriver;
