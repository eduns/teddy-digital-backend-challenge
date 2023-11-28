import ListShortenURLs from '../../../domain/usecases/url/list-shorten-urls';

import { ControllerResponse, ok, badRequest } from '../../factories/responses';

export type ListShortenURLsRequestParams = {
  ownerId: string
};

class ListShortenURLsController {
  constructor (private readonly usecase: ListShortenURLs) {}

  async handle (params: ListShortenURLsRequestParams): Promise<ControllerResponse> {
    const result = await this.usecase.execute({
      ownerId: params.ownerId
    });

    if (result.isLeft()) {
      return badRequest(result.value);
    }

    return ok(result.value);
  }
}

export default ListShortenURLsController;