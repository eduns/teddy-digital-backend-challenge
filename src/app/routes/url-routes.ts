import { Router, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import {
  makeShortenURLController,
  makeDeactivateURLController,
  makeListShortenURLsController,
  makeGetOriginURLController,
  makeGetURLStatsController
} from '../factories/url-controllers';

const shortenURLController = makeShortenURLController();
const deactivateURLController = makeDeactivateURLController();
const listShortenURLsController = makeListShortenURLsController();
const getOriginURLController = makeGetOriginURLController();
const getURLStatsController = makeGetURLStatsController();

const router = Router();

router.get('/url/redirect/:urlId', async (request: Request, response: Response) => {
  if (!request.params['urlId']) {
    return response.status(400).json({ 'error': 'Missing urlId param' });
  }

  const params = {
    urlId: request.params['urlId']
  };

  const result = await getOriginURLController.handle(params);

  if (result.statusCode !== 200) {
    return response.status(result.statusCode).json({ 'error': result.body.message });
  }

  response.redirect(result.body.originUrl);
});

router.get('/urls', async (request: Request, response: Response) => {
  if (!request.body['ownerId']) {
    return response.status(400).json({ 'error': 'Missing ownerId param' });
  }

  const params = {
    ownerId: request.body['ownerId']
  };

  const result = await listShortenURLsController.handle(params);

  const body = result.statusCode !== 200 ? { 'error': result.body.message } : result.body;

  return response.status(result.statusCode).json(body);
});

router.get('/url/stats/:urlId', async (request: Request, response: Response) => {
  if (!request.params['urlId']) {
    return response.status(400).json({ 'error': 'Missing urlId param' });
  }

  const params = {
    urlId: request.params['urlId']
  };

  const result = await getURLStatsController.handle(params);

  const body = result.statusCode !== 200 ? { 'error': result.body.message } : result.body;

  return response.status(result.statusCode).json(body);
});

router.post('/url/shorten', async (request: Request, response: Response) => {
  let token = request.headers['authorization'];
  let ownerId = null;

  if (token) {
    const secretKey = process.env.SECRET_KEY as string;
    token = token.replace(/Bearer /, '');

    try {
      const decodedPayload = verify(token, secretKey);
      ownerId = decodedPayload['userId'];
    } catch (err) {
      return response.status(401).json({
        'error': 'Invalid Authorization Token'
      });
    }
  }

  const params = {
    originUrl: request.body['originUrl'],
    ownerId
  };

  const result = await shortenURLController.handle(params);

  const port = parseInt(process.env.PORT as string);

  const body = result.statusCode !== 200 ? { 'error': result.body.message } : {
    originUrl: result.body.originUrl,
    shortenUrl: `http://localhost:${port}/url/stats/${result.body.urlId}`
  };

  return response.status(result.statusCode).json(body);
});

router.delete('/url/:urlId', async (request: Request, response: Response) => {
  if (!request.params['urlId']) {
    return response.status(400).json({ 'error': 'Missing urlId param' });
  }

  let token = request.headers['authorization'];

  if (!token) {
    return response.status(401).json({
      'error': 'Missing Authorization Token'
    });
  }

  const secretKey = process.env.SECRET_KEY as string;
  token = token.replace(/Bearer /, '');

  try {
    verify(token, secretKey);
  } catch (err) {
    return response.status(401).json({
      'error': 'Invalid Authorization Token'
    });
  }

  const params = {
    urlId: request.params['urlId'],
  };

  const result = await deactivateURLController.handle(params);

  const body = result.statusCode !== 200 ? { 'error': result.body.message } : result.body;

  return response.status(result.statusCode).json(body);
});

export default router;