import { ShortenURLInput, ShortenURLOutput } from '../../../../src/domain/usecases/url/shorten-url';

import { makeShortenUrlUseCase } from '../../../utils';

describe('ShortenURL UseCase', () => {
  it('should be able to shorten a given url to a url up to 6 characters long', async () => {
    const input: ShortenURLInput = {
      originUrl: 'https://youtube.com',
      ownerId: '1',
    };

    const uc = makeShortenUrlUseCase();
    const result = await uc.execute(input);

    expect(result.isRight()).toBeTruthy();

    const shortenUrl = result.value as ShortenURLOutput;

    expect(shortenUrl.urlId).toMatch(new RegExp(/^[A-Za-z0-9]{1,6}$/));
  });

  it('should be able to shorten a given url with no owner', async () => {
    const input: ShortenURLInput = {
      originUrl: 'https://youtube.com',
      ownerId: null
    };

    const uc = makeShortenUrlUseCase();
    const result = await uc.execute(input);

    expect(result.isRight()).toBeTruthy();

    const shortenUrl = result.value as ShortenURLOutput;

    expect(shortenUrl.urlId).toMatch(new RegExp(/^[A-Za-z0-9]{1,6}$/));
  });

  it('should be able to return the matching shorten url for a given url that was already shorten', async () => {
    const input: ShortenURLInput = {
      originUrl: 'https://google.com',
      ownerId: null
    };

    const uc = makeShortenUrlUseCase();
    const result = await uc.execute(input);

    expect(result.isRight()).toBeTruthy();

    const shortenUrl = result.value as ShortenURLOutput;

    expect(shortenUrl.urlId).toBe('axVFGB');
  });
});