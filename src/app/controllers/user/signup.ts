import SignUp from '../../../domain/usecases/user/signup';

import { ControllerResponse, ok, badRequest } from '../../factories/responses';

export type SignUpRequestParams = {
  name: string;
  email: string;
  password: string;
};

class SignUpController {
  constructor (private readonly usecase: SignUp) {}

  async handle (params: SignUpRequestParams): Promise<ControllerResponse> {
    const result = await this.usecase.execute({
      name: params.name,
      email: params.email,
      password: params.password
    });

    if (result.isLeft()) {
      return badRequest(result.value);
    }

    return ok(result.value);
  }
}

export default SignUpController;