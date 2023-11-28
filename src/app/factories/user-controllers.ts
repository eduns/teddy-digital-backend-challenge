import SignIn from '../../domain/usecases/user/signin';
import SignUp from '../../domain/usecases/user/signup';

import UserRepository from '../database/repositories/UserRepository';

import SignInController from '../controllers/user/signin';
import SignUpController from '../controllers/user/signup';

import { pool } from '../database';

const userRepository = new UserRepository(pool);

const makeSignInController = () => {
  return new SignInController(new SignIn(userRepository));
};

const makeSignUpController = () => {
  return new SignUpController(new SignUp(userRepository));
};

export {
  makeSignInController,
  makeSignUpController
};