import DeactivateURL from '../../../domain/usecases/url/deactivate-url';

import { ControllerResponse, ok, badRequest } from '../../factories/responses';

export type DeactivateURLRequestParams = {
  urlId: string;
};

class DeactivateURLController {
  constructor (private readonly usecase: DeactivateURL) {}

  async handle (params: DeactivateURLRequestParams): Promise<ControllerResponse> {
    const result = await this.usecase.execute({
      urlId: params.urlId
    });

    if (result.isLeft()) {
      return badRequest(result.value);
    }

    return ok(result.value);
  }
}

export default DeactivateURLController;