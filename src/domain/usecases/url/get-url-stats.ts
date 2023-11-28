import URLRepository from '../../repositories/URLRepository';

import { Either, left, right } from '../../errors/either';

export type GetURLStatsInput = {
  urlId: string;
};

export type GetURLStatsOutput = {
  urlId: string;
  originUrl: string;
  clicks: number;
};

/**
 * Given a URL id, return its stats
 */
export default class GetURLStats {
  constructor(
    private readonly urlRepository: URLRepository
  ) {}

  async execute (input: GetURLStatsInput): Promise<Either<Error, GetURLStatsOutput>> {
    const shortenURL = await this.urlRepository.findByURLId(input.urlId);

    if (!shortenURL)
      return left(new Error('URL not found'));
    
    const result: GetURLStatsOutput = {
      urlId: shortenURL.urlId,
      originUrl: shortenURL.originUrl,
      clicks: shortenURL.clicks
    };

    return right(result);
  }
}