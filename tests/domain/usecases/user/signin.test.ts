import { SignInInput, SignInOutput } from '../../../../src/domain/usecases/user/signin';

import { makeSignInUseCase } from '../../../utils';

describe('Sign In UseCase', () => {
  it('should be able to sign in a existing user', async () => {
    const input: SignInInput = {
      email: 'foobar1@mail.com',
      password: 'foobarpass'
    };

    const uc = makeSignInUseCase();
    const result = await uc.execute(input);

    expect(result.isRight()).toBeTruthy();

    const output = result.value as SignInOutput;

    expect(output.token).toMatch(new RegExp(/^[0-9a-zA-Z]*\.[0-9a-zA-Z]*\.[0-9a-zA-Z-_]*$/));
  });

  it('should return an error if user is not found', async () => {
    const input: SignInInput = {
      email: 'notfounduser@mail.com',
      password: 'foobarpass'
    };

    const uc = makeSignInUseCase();
    const result = await uc.execute(input);

    expect(result.isLeft()).toBeTruthy();

    const error = result.value as Error;

    expect(error.message).toBe('User not found');
  });
});