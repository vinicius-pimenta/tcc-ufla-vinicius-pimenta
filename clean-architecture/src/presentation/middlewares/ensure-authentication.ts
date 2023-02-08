import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';
import config from 'main/config/auth';
import AppError from '@shared/errors/app-error';

// formato do token decodificado
interface TokenPayload {
  iat: number;
  exp: number;
  id: string;
}

export default function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // pegar o token no header das requisições
  const { authorization } = request.headers;

  if (!authorization) {
    throw new AppError('JWT token is missing', 401);
  }

  // separar 'Bearer token'
  const [, token] = authorization.split(' ');

  try {
    // verificar se é um token válido
    const decoded = verify(token, config.jwt.secret);

    const { id } = decoded as TokenPayload;

    // isso aqui só funciona e possui autocomplete
    // por conta da sobrescrita da declaração de tipos
    // feita no arquivo src/@types/express.d.ts
    request.user = {
      id,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }
}
