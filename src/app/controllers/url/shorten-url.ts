import ShortenURL from '../../../domain/usecases/url/shorten-url';

import { ControllerResponse, ok, badRequest } from '../../factories/responses';

export type ShortenURLRequestParams = {
  originUrl: string;
  ownerId: string | null
};

class ShortenURLController {
  constructor (private readonly usecase: ShortenURL) {}

  async handle (params: ShortenURLRequestParams): Promise<ControllerResponse> {
    const result = await this.usecase.execute({
      originUrl: params.originUrl,
      ownerId: params.ownerId
    });

    if (result.isLeft()) {
      return badRequest(result.value);
    }

    return ok(result.value);
  }
}

export default ShortenURLController;