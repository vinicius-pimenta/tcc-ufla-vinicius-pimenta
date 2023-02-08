import { Request, Response } from 'express';

export const adaptRoute = (controller: any) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {}),
      userId: req.user?.id,
    };
    const httpResponse = await controller.handle(request);

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.data);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.data,
      });
    }
  };
};
