import DeactivateURL, { DeactivateURLInput, DeactivateURLOutput } from '../../../../src/domain/usecases/url/deactivate-url';

import InMemoryURLRepository from '../../../repositories/InMemoryURLRepository';

import { makeDeactivateURLUseCase } from '../../../utils';

describe('DeactivateURL UseCase', () => {
  it('should be able to deactivate a existing url', async () => {
    const input: DeactivateURLInput = {
      urlId: 'axVFGB'
    };

    const urlRepository = new InMemoryURLRepository();
    const uc = new DeactivateURL(urlRepository);

    const result = await uc.execute(input);

    expect(result.isRight()).toBeTruthy();

    const deactivatedURL = result.value as DeactivateURLOutput;

    expect(deactivatedURL.deletedAt).not.toBeNull();  
  });

  it('should be able to deactivate only existing urls', async () => {
    const input: DeactivateURLInput = {
      urlId: 'foobar'
    };

    const uc = makeDeactivateURLUseCase();
    const result = await uc.execute(input);

    expect(result.isLeft()).toBeTruthy();

    const error = result.value as Error;

    expect(error.message).toBe('URL not found');
  });
});