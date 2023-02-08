import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { verify } from 'jsonwebtoken';
import config from '@config/auth';

import AppError from '@errors/AppError';
import { GraphQLSchema } from 'graphql';

type TokenPayload = {
  iat: number;
  exp: number;
  id: string;
};

// eslint-disable-next-line import/prefer-default-export
export const authDirectiveTransformer = (
  schema: GraphQLSchema,
): GraphQLSchema => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      const authDirective = getDirective(schema, fieldConfig, 'auth');
      if (authDirective) {
        const { resolve } = fieldConfig;
        fieldConfig.resolve = async (parent, args, context, info) => {
          const request = {
            accessToken: context?.req?.headers?.['bearer'],
          };

          try {
            const decoded = verify(request.accessToken, config.jwt.secret);

            const { id } = decoded as TokenPayload;

            Object.assign(context?.req, { userId: id });
            return resolve.call(this, parent, args, context, info);
          } catch {
            throw new AppError('Invalid JWT Token', 401);
          }
        };
      }
      return fieldConfig;
    },
  });
};
