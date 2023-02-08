import '@providers/index';
import '@database/index';
import setupApolloServer from './config/apollo-server';

const app = setupApolloServer();

export default app;
