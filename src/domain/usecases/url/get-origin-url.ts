import URLRepository from '../../repositories/URLRepository';

import { Either, left, right } from '../../errors/either';

export type GetOriginURLInput = {
  urlId: string;
};

export type GetOriginURLOutput = {
  originUrl: string;
};

/**
 * Given a URL id, return its origin url
 */
export default class GetOriginURL {
  constructor(
    private readonly urlRepository: URLRepository
  ) {}

  async execute (input: GetOriginURLInput): Promise<Either<Error, GetOriginURLOutput>> {
    const shortenURL = await this.urlRepository.findByURLId(input.urlId);

    if (!shortenURL)
      return left(new Error('URL not found'));
    
    const result: GetOriginURLOutput = {
      originUrl: shortenURL.originUrl
    };

    shortenURL.updateClicks();

    await this.urlRepository.updateShortenURL(shortenURL);

    return right(result);
  }
}