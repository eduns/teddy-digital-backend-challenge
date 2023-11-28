import { randomUUID } from 'crypto';

import UserRepository from '../../repositories/UserRepository';

import { Either, right } from '../../errors/either';

import { generatePassHash } from '../../utils';

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

export type SignUpOutput = {
  name: string;
  email: string;
};

/**
 * Sign Up a user
 */
export default class SignUp {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async execute (input: SignUpInput): Promise<Either<Error, SignUpOutput>> {
    await this.userRepository.registerUser({
      id: randomUUID(),
      name: input.name,
      email: input.email,
      passHash: generatePassHash(input.password)
    });

    const result: SignUpOutput = {
      name: input.name,
      email: input.email
    };

    return right(result);
  }
}
