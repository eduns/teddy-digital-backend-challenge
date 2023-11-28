import ShortURL from '../../../../src/domain/entities/ShortURL';

import GetURLStats, { GetURLStatsInput } from '../../../../src/domain/usecases/url/get-url-stats';

import InMemoryURLRepository from '../../../repositories/InMemoryURLRepository';

import { makeGetURLStatsUseCase } from '../../../utils';

describe('GetURLStats UseCase', () => {
  it('should be able to return all stats of an url', async () => {
    const input: GetURLStatsInput = {
      urlId: 'axVFGB'
    };

    const urlRepository = new InMemoryURLRepository();
    const uc = new GetURLStats(urlRepository);

    const result = await uc.execute(input);

    expect(result.isRight()).toBeTruthy();

    const updatedUrl = result.value as ShortURL;

    expect(updatedUrl.urlId).toBe('axVFGB');
    expect(updatedUrl.originUrl).toBe('https://google.com');
    expect(updatedUrl.clicks).toBe(0);
  });

  it('should return an error for not found URLs', async () => {
    const input: GetURLStatsInput = {
      urlId: 'foobar'
    };

    const uc = makeGetURLStatsUseCase();
    const result = await uc.execute(input);

    expect(result.isLeft()).toBeTruthy();

    const error = result.value as Error;

    expect(error.message).toBe('URL not found');
  });
});