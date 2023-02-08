export interface HttpResponse {
  statusCode: number;
  error?: {
    name: string;
    message: string;
    body?: any;
  };
  data?: any;
}

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  data,
});

export const badRequest = (body: any): HttpResponse => ({
  statusCode: 400,
  body,
});
