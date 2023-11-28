import URLRepository from '../../repositories/URLRepository';

import { Either, left, right } from '../../errors/either';

export type UpdateURLClicksInput = {
  urlId: string;
};

export type UpdateURLClicksOutput = {
  urlId: string;
  clicks: number;
}

/**
 * Given a URL id, update the number of clicks
 */
export default class UpdateURLClicks {
  constructor(
    private readonly urlRepository: URLRepository
  ) {}

  async execute (input: UpdateURLClicksInput): Promise<Either<Error, UpdateURLClicksOutput>> {
    const shortenURL = await this.urlRepository.findByURLId(input.urlId);

    if (!shortenURL) {
      return left(new Error('URL not found'));
    }

    shortenURL.updateClicks();

    await this.urlRepository.updateShortenURL(shortenURL);

    const result: UpdateURLClicksOutput = {
      urlId: shortenURL.urlId,
      clicks: shortenURL.clicks
    };

    return right(result);
  }
}