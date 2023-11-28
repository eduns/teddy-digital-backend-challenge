import URLRepository from '../../repositories/URLRepository';

import { Either, left, right } from '../../errors/either';

export type DeactivateURLInput = {
  urlId: string;
};

export type DeactivateURLOutput = {
  urlId: string;
  deletedAt: Date;
}

/**
 * Given a URL id, make it deactivated
 */
export default class DeactivateURL {
  constructor(
    private readonly urlRepository: URLRepository
  ) {}

  async execute (input: DeactivateURLInput): Promise<Either<Error, DeactivateURLOutput>> {
    const shortenURL = await this.urlRepository.findByURLId(input.urlId);

    if (!shortenURL)
      return left(new Error('URL not found'));

    shortenURL.deactivateURL();

    await this.urlRepository.updateShortenURL(shortenURL);

    const result: DeactivateURLOutput = {
      urlId: shortenURL.urlId,
      deletedAt: shortenURL.deletedAt as Date
    };

    return right(result);
  }
}