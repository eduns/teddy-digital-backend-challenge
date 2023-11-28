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
  createdAt: Date;
  deletedAt: Date | null;
  ownerId: string | null;
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
        originUrl: shortenURL.originUrl,
        createdAt: shortenURL.createdAt,
        deletedAt: shortenURL.deletedAt,
        ownerId: shortenURL.ownerId
      };

      return right(result);
    }

    const urlId = generateURLId();
    const ownerId = input.ownerId as string;
    
    shortenURL = new ShortURL(urlId, input.originUrl, ownerId);

    await this.urlRepository.save(shortenURL);
      
    result = {
      urlId,
      originUrl: shortenURL.originUrl,
      createdAt: shortenURL.createdAt,
      deletedAt: shortenURL.deletedAt,
      ownerId
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