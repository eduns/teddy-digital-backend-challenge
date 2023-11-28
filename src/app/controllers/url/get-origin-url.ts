import GetOriginURL from '../../../domain/usecases/url/get-origin-url';

import { ControllerResponse, ok, badRequest } from '../../factories/responses';

export type GetOriginURLRequestParams = {
  urlId: string;
};

class GetOriginURLController {
  constructor (private readonly usecase: GetOriginURL) {}

  async handle (params: GetOriginURLRequestParams): Promise<ControllerResponse> {
    const result = await this.usecase.execute({
      urlId: params.urlId
    });

    if (result.isLeft()) {
      return badRequest(result.value);
    }

    return ok(result.value);
  }
}

export default GetOriginURLController;