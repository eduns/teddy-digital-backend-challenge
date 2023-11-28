import ShortURL from '../../src/domain/entities/ShortURL';

import URLRepository from '../../src/domain/repositories/URLRepository';

export default class InMemoryURLRepository implements URLRepository {
  private readonly urls: ShortURL[] = [
    new ShortURL('axVFGB', 'https://google.com', '1', new Date(2023, 11, 27, 20, 30), new Date(2023, 11, 27, 20, 30), null, 0),
    new ShortURL('CDniFk', 'https://mega.nz', '1', new Date(2023, 11, 27, 21, 0), new Date(2023, 11, 27, 21, 0), null, 0),
    new ShortURL('Lfms6R', 'https://facebook.com', '2', new Date(2023, 11, 27, 20, 0), new Date(2023, 11, 27, 20, 0), null, 0),
    new ShortURL('9hkfMU', 'https://instagram.com', '2', new Date(2023, 11, 27, 20, 0), new Date(2023, 11, 27, 20, 0), null, 0),
    new ShortURL('Qw741s', 'https://yandex.com', null, new Date(2023, 11, 27, 22, 0), new Date(2023, 11, 27, 22, 0), null, 0)
  ];

  async findByOriginURL (url: string): Promise<ShortURL | null> {
    return this.urls.find(shortUrl => shortUrl.originUrl === url) || null;
  }

  async findByURLId (urlId: string): Promise<ShortURL | null> {
    return this.urls.find(shortUrl => shortUrl.urlId === urlId) || null;
  }

  async save (shortenURL: ShortURL): Promise<void> {
    this.urls.push(shortenURL);
  }

  async updateShortenURL (updatedUrl: ShortURL): Promise<void> {
    const urlIndex = this.urls.findIndex(url => url.urlId === updatedUrl.urlId);
    this.urls[urlIndex] = updatedUrl;
  }

  async findByOwnerId (ownerId: string): Promise<ShortURL[]> {
    return this.urls.filter(url => url.ownerId === ownerId);
  }
}