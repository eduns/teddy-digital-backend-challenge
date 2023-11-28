import { Router, Request, Response } from 'express';

import { SignInRequestParams } from '../controllers/user/signin';
import { SignUpRequestParams } from '../controllers/user/signup';

import { makeSignInController, makeSignUpController } from '../factories/user-controllers';

const signInController = makeSignInController();
const signUpController = makeSignUpController();

const router = Router();

router.post('/signin', async (request: Request, response: Response) => {
  const params: SignInRequestParams = {
    email: request.body['email'],
    password: request.body['password']
  };

  const result = await signInController.handle(params);

  const body = result.statusCode !== 200 ? { 'error': result.body.message } : result.body;

  return response.status(result.statusCode).json(body);
});

router.post('/signup', async (request: Request, response: Response) => {
  const params: SignUpRequestParams = {
    name: request.body['name'],
    email: request.body['email'],
    password: request.body['password']
  };

  const result = await signUpController.handle(params);

  const body = result.statusCode !== 200 ? { 'error': result.body.message } : result.body;

  return response.status(result.statusCode).json(body);
});

export default router;