import validator from 'validator';

import { fieldError } from './fieldError';

interface NewUserArgs {
  email: string;
  username: string;
  password: string;
}

function validateUsername(username: string) {
  return validator.isAlphanumeric(username);
}

function validateAndSanitizeNewUser(args: NewUserArgs) {
  const isEmail = validator.isEmail(args.email);

  if (!isEmail) {
    return { error: fieldError('email', 'Invalid Email') };
  }

  const isValidUsername = validateUsername(args.username);

  if (!isValidUsername) {
    return { error: fieldError('username', 'Invalid Username') };
  }

  return {
    username: args.username.trim(),
    password: args.password.trim(),
    email: args.email.trim().toLowerCase(),
  };
}

export type { NewUserArgs };
export { validateUsername, validateAndSanitizeNewUser };
