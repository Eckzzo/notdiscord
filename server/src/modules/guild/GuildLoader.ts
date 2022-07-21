import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';

import { GuildModel } from './GuildModel';

const {
  Wrapper: Guild,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: GuildModel,
  loaderName: 'GuildLoader',
});

registerLoader('GuildLoader', getLoader);

export { Guild, getLoader, clearCache, load, loadAll };
