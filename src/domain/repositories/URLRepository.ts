import ShortURL from '../entities/ShortURL';

interface URLRepository {
  findByOriginURL (url: string): Promise<ShortURL | null>;
  findByURLId (urlId: string): Promise<ShortURL | null>;
  findByOwnerId (ownerId: string): Promise<ShortURL[]>;
  save (shortenURL: ShortURL): Promise<void>;
  updateShortenURL (url: ShortURL): Promise<void>;
}

export default URLRepository;