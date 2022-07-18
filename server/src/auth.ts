import jwt from 'jsonwebtoken';
import { ParameterizedContext } from 'koa';

import { config } from './config';
import { UserDocument, UserModel } from './modules/user/UserModel';

const AUTH_COOKIE_NAME = 'jwt';

interface DecodedToken {
  id: string;
}

async function getUser(ctx: ParameterizedContext) {
  const token = ctx.cookies.get('jwt');

  if (!token) return { user: null };

  try {
    const decodedToken = jwt.verify(token.substring(4), config.JWT_SECRET);

    const user = await UserModel.findOne({ _id: (decodedToken as DecodedToken).id });

    return { user };
  } catch (err) {
    return { user: null };
  }
}

function generateToken(user: UserDocument) {
  return `JWT ${jwt.sign({ id: user._id }, config.JWT_SECRET)}`;
}

function setAuthCookie(ctx: ParameterizedContext, user: UserDocument) {
  ctx.cookies.set(AUTH_COOKIE_NAME, generateToken(user), {
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
    secure: false,
    signed: false,
  });
}

export { getUser, generateToken, setAuthCookie };
