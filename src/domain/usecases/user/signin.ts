import UserRepository from '../../repositories/UserRepository';

import { Either, left, right } from '../../errors/either';

import { generatePassHash, generateToken } from '../../utils';

export type SignInInput = {
  email: string;
  password: string;
}

export type SignInOutput = {
  token: string;
}

/**
 * Sign In a user
 */
export default class SignIn {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute (input: SignInInput): Promise<Either<Error, SignInOutput>> {
    const user = await this.userRepository.findByCredentials(
      input.email,
      generatePassHash(input.password)
    );

    if (!user)
      return left(new Error('User not found'));

    const token = generateToken({
      username: user.name,
      password: input.password
    }); 

    const result: SignInOutput = {
      token
    };

    return right(result);
  }
}