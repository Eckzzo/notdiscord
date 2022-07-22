import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';

import { MessageModel } from './MessageModel';
import { MessageFilterMapping } from './MessageFilterInputType';

const {
  Wrapper: Message,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: MessageModel,
  loaderName: 'MessageLoader',
  filterMapping: MessageFilterMapping,
});

registerLoader('MessageLoader', getLoader);

export { Message, getLoader, clearCache, load, loadAll };
