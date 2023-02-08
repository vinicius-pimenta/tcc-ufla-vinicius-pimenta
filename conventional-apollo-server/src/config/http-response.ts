export type HttpResponse = {
  statusCode: number;
  error?: {
    name: string;
    message: string;
    body?: any;
  };
  data?: any;
};

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data,
});

export const badRequest = (data: any): HttpResponse => ({
  statusCode: 400,
  data,
});
