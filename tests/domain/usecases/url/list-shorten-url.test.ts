import { ListShortenURLsInput, ListShortenURLsOutput } from '../../../../src/domain/usecases/url/list-shorten-urls';

import { makeListShortenURLsUseCase } from '../../../utils';

describe('ListShortenURLs UseCase', () => {
  it('should be able to return all stats of an url', async () => {
    const input: ListShortenURLsInput = {
      ownerId: '1'
    };

    const uc = makeListShortenURLsUseCase();
    const result = await uc.execute(input);

    expect(result.isRight()).toBeTruthy();

    const updatedUrl = result.value as ListShortenURLsOutput;

    expect(updatedUrl.urls.length).toBe(2);
  });

  it('should return an empty list for not found ownerId', async () => {
    const input: ListShortenURLsInput = {
      ownerId: 'foo'
    };

    const uc = makeListShortenURLsUseCase();
    const result = await uc.execute(input);

    expect(result.isRight()).toBeTruthy();

    const r = result.value as ListShortenURLsOutput;

    expect(r.urls.length).toBe(0);
  });
});