import ShortURL from '../../entities/ShortURL';

import URLRepository from '../../repositories/URLRepository';

import { Either, right } from '../../errors/either';

export type ShortenURLInput = {
  originUrl: string;
  ownerId: string | null;
};

export type ShortenURLOutput = {
  urlId: string;
  originUrl: string;
}

/**
 * Shorten a given URL up to 6 characters long
 */
export default class ShortenURL {
  constructor(
    private readonly urlRepository: URLRepository
  ) {}

  async execute (input: ShortenURLInput): Promise<Either<Error, ShortenURLOutput>> {
    let shortenURL;
    let result: ShortenURLOutput;

    shortenURL = await this.urlRepository.findByOriginURL(input.originUrl);
      
    if (shortenURL) {
      result = {
        urlId: shortenURL.urlId,
        originUrl: shortenURL.originUrl
      };

      return right(result);
    }

    const urlId = generateURLId();
    const originUrl = input.originUrl;

    shortenURL = ShortURL.create({
      urlId,
      originUrl,
      ownerId: input.ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      clicks: 0
    });

    await this.urlRepository.save(shortenURL);
      
    result = {
      urlId,
      originUrl,
    };

    return right(result);
  }
}

function generateURLId(): string {
  const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const urlLength = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  let urlId = '';
  
  for (let i = 0; i < urlLength; i++) {
    urlId += CHARS[Math.floor(Math.random() * urlLength)];
  }

  return urlId;
}