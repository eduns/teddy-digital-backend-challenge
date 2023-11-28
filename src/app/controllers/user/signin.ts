import SignIn from '../../../domain/usecases/user/signin';

import { ControllerResponse, ok, badRequest } from '../../factories/responses';

export type SignInRequestParams = {
  email: string;
  password: string;
};

class SignInController {
  constructor (private readonly usecase: SignIn) {}

  async handle (params: SignInRequestParams): Promise<ControllerResponse> {
    const result = await this.usecase.execute({
      email: params.email,
      password: params.password
    });

    if (result.isLeft()) {
      return badRequest(result.value);
    }

    return ok(result.value);
  }
}

export default SignInController;