import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server';

/* eslint-disable no-empty */
export const adaptResolver = async (
  controller: any,
  args: any,
  context?: any,
): Promise<any> => {
  const request = {
    ...(args || {}),
    userId: context?.req?.userId,
  };

  const httpResponse = await controller.handle(request);

  console.log(httpResponse);

  switch (httpResponse.statusCode) {
    case 200:
      return httpResponse.data;
    case 204:
      return httpResponse.data;
    case 400:
      throw new UserInputError(httpResponse.data);
    case 401:
      throw new AuthenticationError(httpResponse.data);
    case 403:
      throw new ForbiddenError(httpResponse.data);
    default:
      throw new ApolloError(httpResponse.data);
  }
};
