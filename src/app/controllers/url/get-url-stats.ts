import GetURLStats from '../../../domain/usecases/url/get-url-stats';

import { ControllerResponse, ok, badRequest } from '../../factories/responses';

export type GetURLStatsRequestParams = {
  urlId: string
};

class GetURLStatsController {
  constructor (private readonly usecase: GetURLStats) {}

  async handle (params: GetURLStatsRequestParams): Promise<ControllerResponse> {
    const result = await this.usecase.execute({
      urlId: params.urlId
    });

    if (result.isLeft()) {
      return badRequest(result.value);
    }

    return ok(result.value);
  }
}

export default GetURLStatsController;