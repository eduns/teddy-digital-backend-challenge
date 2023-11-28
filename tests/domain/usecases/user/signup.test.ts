import SignUp, { SignUpInput } from '../../../../src/domain/usecases/user/signup';

import InMemoryUserRepository from '../../../repositories/InMemoryUserRepository';

import { generatePassHash } from '../../../../src/domain/utils';

describe('Sign Up UseCase', () => {
  it('should be able to signup a user', async () => {
    const input: SignUpInput = {
      name: 'Foo Bar',
      email: 'foobar@mail.com',
      password: 'foobarpass'
    };

    const userRepository = new InMemoryUserRepository();
    const uc = new SignUp(userRepository);

    await uc.execute(input);

    const passHash = generatePassHash(input.password);
    const newUser = await userRepository.findByCredentials(input.email, passHash);

    expect(newUser).not.toBeNull();
    expect(newUser?.name).toBe(input.name);
    expect(newUser?.email).toBe(input.email);
    expect(newUser?.passHash).toBe(passHash);
  });
});