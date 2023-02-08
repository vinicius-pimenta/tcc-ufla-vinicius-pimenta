import IQueueProvider, { AddJobInput } from '../queue-provider.interface';

export default class FakeQueueProvider implements IQueueProvider {
  getQueues() {
    return [];
  }

  async addJob(_input: AddJobInput) {
    // Método não implementado de forma intencional
  }

  startTransactionWorker() {
    // Método não implementado de forma intencional
  }

  startMessageWorker() {
    // Método não implementado de forma intencional
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
}
