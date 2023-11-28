import ShortenURL from '../../domain/usecases/url/shorten-url';
import DeactivateURL from '../../domain/usecases/url/deactivate-url';
import ListShortenURLs from '../../domain/usecases/url/list-shorten-urls';
import GetOriginURL from '../../domain/usecases/url/get-origin-url';
import GetURLStats from '../../domain/usecases/url/get-url-stats';

import URLRepository from '../database/repositories/URLRepository';

import ShortenURLController from '../controllers/url/shorten-url';
import DeactivateURLController from '../controllers/url/deactivate-url';
import ListShortenURLsController from '../controllers/url/list-shorten-urls';
import GetOriginURLController from '../controllers/url/get-origin-url';
import GetURLStatsController from '../controllers/url/get-url-stats';

import { pool } from '../database';

const urlRepository = new URLRepository(pool);

const makeShortenURLController = () => {
  return new ShortenURLController(new ShortenURL(urlRepository));
};

const makeDeactivateURLController = () => {
  return new DeactivateURLController(new DeactivateURL(urlRepository));
};

const makeListShortenURLsController = () => {
  return new ListShortenURLsController(new ListShortenURLs(urlRepository));
};

const makeGetOriginURLController = () => {
  return new GetOriginURLController(new GetOriginURL(urlRepository));
};

const makeGetURLStatsController = () => {
  return new GetURLStatsController(new GetURLStats(urlRepository));
};

export {
  makeShortenURLController,
  makeDeactivateURLController,
  makeListShortenURLsController,
  makeGetOriginURLController,
  makeGetURLStatsController
};