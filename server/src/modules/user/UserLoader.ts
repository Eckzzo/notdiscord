import { createLoader } from '@entria/graphql-mongo-helpers';

import { registerLoader } from '../loader/loaderRegister';

import { UserModel } from './UserModel';

const {
  Wrapper: User,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({ model: UserModel, loaderName: 'UserLoader' });

registerLoader('UserLoader', getLoader);

export { User, getLoader, clearCache, load, loadAll };
