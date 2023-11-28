import ShortenURL from '../src/domain/usecases/url/shorten-url';
import UpdateURLClicks from '../src/domain/usecases/url/update-url-clicks';
import DeactivateURL from '../src/domain/usecases/url/deactivate-url';
import SignUp from '../src/domain/usecases/user/signup';
import SignIn from '../src/domain/usecases/user/signin';

import InMemoryURLRepository from './repositories/InMemoryURLRepository';
import InMemoryUserRepository from './repositories/InMemoryUserRepository';

const makeShortenUrlUseCase = () => {
  return new ShortenURL(new InMemoryURLRepository());
};

const makeUpdateUrlClicksUseCase = () => {
  return new UpdateURLClicks(new InMemoryURLRepository());
};

const makeDeactivateURLUseCase = () => {
  return new DeactivateURL(new InMemoryURLRepository());
};

const makeSignUpUseCase = () => {
  return new SignUp(new InMemoryUserRepository());
};

const makeSignInUseCase = () => {
  return new SignIn(new InMemoryUserRepository());
};

export {
  makeShortenUrlUseCase,
  makeUpdateUrlClicksUseCase,
  makeDeactivateURLUseCase,
  makeSignUpUseCase,
  makeSignInUseCase
};