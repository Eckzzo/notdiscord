import { ParameterizedContext } from 'koa';
import { Dataloaders } from '../modules/loader/loaderRegister';

import { UserDocument } from '../modules/user/UserModel';

interface GraphQLContext {
  ctx: ParameterizedContext;
  user?: UserDocument;
  dataloaders: Dataloaders;
}

export type { GraphQLContext };
