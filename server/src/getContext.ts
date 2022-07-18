import { ParameterizedContext } from 'koa';

import { UserDocument } from './modules/user/UserModel';
import { getDataloaders } from './modules/loader/loaderRegister';

interface ContextVars {
  ctx: ParameterizedContext;
  user: UserDocument | null;
}

async function getContext({ ctx, user }: ContextVars) {
  const dataloaders = getDataloaders();

  return {
    ctx,
    dataloaders,
    user,
  } as const;
}

export { getContext };
