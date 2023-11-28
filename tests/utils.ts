import ShortenURL from '../src/domain/usecases/url/shorten-url';
import DeactivateURL from '../src/domain/usecases/url/deactivate-url';
import GetOriginURL from '../src/domain/usecases/url/get-origin-url';
import ListShortenURLs from '../src/domain/usecases/url/list-shorten-urls';
import GetURLStats from '../src/domain/usecases/url/get-url-stats';
import SignUp from '../src/domain/usecases/user/signup';
import SignIn from '../src/domain/usecases/user/signin';

import InMemoryURLRepository from './repositories/InMemoryURLRepository';
import InMemoryUserRepository from './repositories/InMemoryUserRepository';

const makeShortenUrlUseCase = () => {
  return new ShortenURL(new InMemoryURLRepository());
};

const makeDeactivateURLUseCase = () => {
  return new DeactivateURL(new InMemoryURLRepository());
};

const makeGetOriginURLUseCase = () => {
  return new GetOriginURL(new InMemoryURLRepository());
};

const makeListShortenURLsUseCase = () => {
  return new ListShortenURLs(new InMemoryURLRepository());
};

const makeGetURLStatsUseCase = () => {
  return new GetURLStats(new InMemoryURLRepository());
};

const makeSignUpUseCase = () => {
  return new SignUp(new InMemoryUserRepository());
};

const makeSignInUseCase = () => {
  return new SignIn(new InMemoryUserRepository());
};

export {
  makeShortenUrlUseCase,
  makeDeactivateURLUseCase,
  makeGetOriginURLUseCase,
  makeListShortenURLsUseCase,
  makeGetURLStatsUseCase,
  makeSignUpUseCase,
  makeSignInUseCase
};