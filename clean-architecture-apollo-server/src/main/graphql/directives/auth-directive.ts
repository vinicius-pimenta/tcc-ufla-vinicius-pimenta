import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { makeTokenManager } from '@main/factories/token-manager';

import AppError from '@shared/errors/app-error';
import { GraphQLSchema } from 'graphql';

type TokenPayload = {
  iat: number;
  exp: number;
  id: string;
};

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
            const jwtTokenManager = makeTokenManager();

            const decoded = await jwtTokenManager.verify(request.accessToken);

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
