import { makeExecutableSchema } from '@graphql-tools/schema';

import { ApolloServer } from 'apollo-server';

import { GraphQLError } from 'graphql';
import { rateLimitDirective } from 'graphql-rate-limit-directive';
import resolvers from '../graphql/resolvers';
import { authDirectiveTransformer } from '../graphql/directives';

import typeDefs from '../graphql/type-defs';

const { rateLimitDirectiveTypeDefs, rateLimitDirectiveTransformer } =
  rateLimitDirective();

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError?.name].some(
    name => name === errorName,
  );
};

const handleErrors = (
  response: any,
  errors: readonly GraphQLError[] | undefined,
): void => {
  if (errors && errors.length > 0) {
    errors.forEach(error => {
      response.data = undefined;
      if (checkError(error, 'UserInputError')) {
        response.http.status = 400;
      } else if (checkError(error, 'AuthenticationError')) {
        response.http.status = 401;
      } else if (checkError(error, 'ForbiddenError')) {
        response.http.status = 403;
      } else {
        response.http.status = 500;
      }
    });
  }
};

let schema = makeExecutableSchema({
  resolvers,
  typeDefs: [rateLimitDirectiveTypeDefs, ...typeDefs],
});
schema = rateLimitDirectiveTransformer(schema);
schema = authDirectiveTransformer(schema);

export default (): ApolloServer => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    plugins: [
      {
        requestDidStart: async () => ({
          willSendResponse: async ({ response, errors }) =>
            handleErrors(response, errors),
        }),
      },
    ],
  });

  return server;
};
