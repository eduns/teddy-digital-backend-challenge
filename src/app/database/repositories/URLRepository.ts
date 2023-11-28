import { Pool } from 'pg';

import ShortURL from '../../../domain/entities/ShortURL';

import URLRepository from '../../../domain/repositories/URLRepository';

class URLRepositoryPostgres implements URLRepository {
  constructor (private readonly connection: Pool) {}

  async findByOriginURL (url: string): Promise<ShortURL | null> {
    const result = await this.connection.query('SELECT * FROM urls WHERE origin_url = $1', [url]);

    if (!result.rowCount) {
      return null;
    }

    const urlData = result.rows[0];

    return new ShortURL(
      urlData['id'] as string,
      urlData['url_origin'] as string,
      urlData['owner_id'] as string,
      urlData['created_at'] as Date,
      urlData['updated_at'] as Date,
      urlData['deleted_at'],
      urlData['clicks'] as number
    );
  }
  
  async findByURLId (urlId: string): Promise<ShortURL | null> {
    const result = await this.connection.query('SELECT * FROM urls WHERE id = $1', [urlId]);

    if (!result.rowCount) {
      return null;
    }

    const urlData = result.rows[0];
    
    return new ShortURL(
      urlData['id'] as string,
      urlData['origin_url'] as string,
      urlData['owner_id'] as string,
      urlData['created_at'] as Date,
      urlData['updated_at'] as Date,
      urlData['deleted_at'],
      urlData['clicks'] as number
    );
  }

  async save (shortenURL: ShortURL): Promise<void> {
    const createDateString = shortenURL.createdAt.toLocaleDateString('pt-br').split('/').reverse().join('-');
    const createTimeString = shortenURL.createdAt.toLocaleTimeString('pt-br');
    const createTimestamp = `${createDateString} ${createTimeString}`;

    await this.connection.query(`
      INSERT INTO urls (id, origin_url, owner_id, created_at, updated_at, deleted_at)
      VALUES ($1, $2, $3, TO_TIMESTAMP($4, 'YYYY-MM-DD HH24:MI:SS'), TO_TIMESTAMP($5, 'YYYY-MM-DD HH24:MI:SS'), $6)`,
      [shortenURL.urlId, shortenURL.originUrl, shortenURL.ownerId, createTimestamp, createTimestamp, null]);
  }

  async updateShortenURL (url: ShortURL): Promise<void> {
    const now = new Date();
    const updateDateString = now.toLocaleDateString('pt-br').split('/').reverse().join('-');
    const updateTimeString = now.toLocaleTimeString('pt-br');

    const updateTimestamp = `${updateDateString} ${updateTimeString}`;

    let deleteTimestamp;

    if (url.deletedAt) {
      const deleteDateString = now.toLocaleDateString('pt-br').split('/').reverse().join('-');
      const deleteTimeString = now.toLocaleTimeString('pt-br');

      deleteTimestamp = `${deleteDateString} ${deleteTimeString}`;
    }

    await this.connection.query(
      `UPDATE urls SET
        updated_at = TO_TIMESTAMP($1, 'YYYY-MM-DD HH24:MI:SS'),
        clicks = $2,
        deleted_at = ${deleteTimestamp ? 'TO_TIMESTAMP($3, \'YYYY-MM-DD HH24:MI:SS\')' : '$3'}
      WHERE id = $4`,
      [updateTimestamp, url.clicks, deleteTimestamp || null, url.urlId]);
  }

  async findByOwnerId (ownerId: string): Promise<ShortURL[]> {
    const result = await this.connection.query('SELECT * FROM urls WHERE owner_id = $1', [ownerId]);

    let urls: ShortURL[] = [];

    if (result.rowCount) {
      urls = result.rows.map(row => {
        return new ShortURL(
          row['id'] as string,
          row['origin_url'] as string,
          row['owner_id'] as string,
          row['created_at'] as Date,
          row['updated_at'] as Date,
          row['deleted_at'],
          row['clicks'] as number
        );
      });
    }

    return urls;
  }
}

export default URLRepositoryPostgres;