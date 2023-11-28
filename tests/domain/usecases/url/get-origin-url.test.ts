import ShortURL from '../../../../src/domain/entities/ShortURL';

import GetOriginURL, { GetOriginURLInput } from '../../../../src/domain/usecases/url/get-origin-url';

import InMemoryURLRepository from '../../../repositories/InMemoryURLRepository';

import { makeGetOriginURLUseCase } from '../../../utils';

describe('GetOriginURL UseCase', () => {
  it('should be able to return the origin url for an url id', async () => {
    const input: GetOriginURLInput = {
      urlId: 'axVFGB'
    };

    const urlRepository = new InMemoryURLRepository();
    const uc = new GetOriginURL(urlRepository);

    const result = await uc.execute(input);

    expect(result.isRight()).toBeTruthy();

    const updatedUrl = result.value as ShortURL;

    expect(updatedUrl.originUrl).toBe('https://google.com');
  });

  it('should return an error for not found URLs', async () => {
    const input: GetOriginURLInput = {
      urlId: 'foobar'
    };

    const uc = makeGetOriginURLUseCase();
    const result = await uc.execute(input);

    expect(result.isLeft()).toBeTruthy();

    const error = result.value as Error;

    expect(error.message).toBe('URL not found');
  });
});