import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';

import { ChannelModel } from './ChannelModel';
import { ChannelFilterMapping } from './ChannelFilterInputType';

const {
  Wrapper: Channel,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: ChannelModel,
  loaderName: 'ChannelLoader',
  filterMapping: ChannelFilterMapping,
});

registerLoader('ChannelLoader', getLoader);

export { Channel, getLoader, clearCache, load, loadAll };
