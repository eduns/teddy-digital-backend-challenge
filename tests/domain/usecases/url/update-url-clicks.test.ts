import ShortURL from '../../../../src/domain/entities/ShortURL';

import UpdateURLClicks, { UpdateURLClicksInput } from '../../../../src/domain/usecases/url/update-url-clicks';

import InMemoryURLRepository from '../../../repositories/InMemoryURLRepository';

import { makeUpdateUrlClicksUseCase } from '../../../utils';

describe('UpdateURLClicks UseCase', () => {
  it('should be able to update the number of clicks of a existing url', async () => {
    const input: UpdateURLClicksInput = {
      urlId: 'axVFGB'
    };

    const urlRepository = new InMemoryURLRepository();
    const uc = new UpdateURLClicks(urlRepository);

    const result = await uc.execute(input);

    expect(result.isRight()).toBeTruthy();

    const updatedUrl = result.value as ShortURL;

    expect(updatedUrl.clicks).toBe(1);
  });

  it('should return an error for not found URLs', async () => {
    const input: UpdateURLClicksInput = {
      urlId: 'foobar'
    };

    const uc = makeUpdateUrlClicksUseCase();
    const result = await uc.execute(input);

    expect(result.isLeft()).toBeTruthy();

    const error = result.value as Error;

    expect(error.message).toBe('URL not found');
  });
});