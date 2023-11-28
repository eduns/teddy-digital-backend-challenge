import ShortURL from '../entities/ShortURL';

interface URLRepository {
  findByOriginURL (url: string): Promise<ShortURL | null>;
  findByURLId (urlId: string): Promise<ShortURL | null>;
  save (shortenURL: ShortURL): Promise<void>;
  updateShortenURL (url: ShortURL): Promise<void>;
}

export default URLRepository;