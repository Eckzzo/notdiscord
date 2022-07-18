import { createLoader } from '@entria/graphql-mongo-helpers';

import { FriendshipModel } from './FriendshipModel';
import { registerLoader } from '../loader/loaderRegister';
import { FriendshipFilterMapping } from './FriendshipFilterInputType';

const {
  Wrapper: Friendship,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({
  model: FriendshipModel,
  loaderName: 'FriendshipLoader',
  filterMapping: FriendshipFilterMapping,
});

registerLoader('FriendshipLoader', getLoader);

export { Friendship, getLoader, clearCache, load, loadAll };
