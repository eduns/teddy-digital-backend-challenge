import URLRepository from '../../repositories/URLRepository';

import { Either, right } from '../../errors/either';

export type ListShortenURLsInput = {
  ownerId: string;
};

export type ListShortenURLsOutput = {
  urls: {
    urlId: string;
    originUrl: string;
    clicks: number;
  }[];
}

/**
 * List all shorten urls by an user
 */
export default class ListShortenURLs {
  constructor(
    private readonly urlRepository: URLRepository
  ) {}

  async execute (input: ListShortenURLsInput): Promise<Either<Error, ListShortenURLsOutput>> {
    const allURLs = await this.urlRepository.findByOwnerId(input.ownerId);

    const result: ListShortenURLsOutput = {
      urls: allURLs.map(url => {
        return {
          urlId: url.urlId,
          originUrl: url.originUrl,
          clicks: url.clicks
        };
      })
    };

    return right(result);
  }
}