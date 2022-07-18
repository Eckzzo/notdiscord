import { createLoader } from '@entria/graphql-mongo-helpers';

import { UserModel } from './UserModel';
import { registerLoader } from '../loader/loaderRegister';

const {
  Wrapper: User,
  getLoader,
  clearCache,
  load,
  loadAll,
} = createLoader({ model: UserModel, loaderName: 'UserLoader' });

registerLoader('UserLoader', getLoader);

export { User, getLoader, clearCache, load, loadAll };
