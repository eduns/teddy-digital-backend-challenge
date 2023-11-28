import { Pool } from 'pg';

import User from '../../../domain/entities/User';

import UserRepository from '../../../domain/repositories/UserRepository';

class UserRepositoryPostgres implements UserRepository {
  constructor (private readonly connection: Pool) {}

  async findByCredentials (email: string, passHash: string): Promise<User | null> {
    const result = await this.connection.query('SELECT * from users WHERE email = $1 AND pass_hash = $2',
      [email, passHash]);

    if (!result.rowCount) {
      return null;
    }

    const userData = result.rows[0];

    return new User(
      userData['id'] as string,
      userData['name'] as string,
      userData['email'] as string,
      userData['pass_hash'] as string
    );
  }

  async registerUser (userData: {
    id: string;
    name: string;
    email: string;
    passHash: string;
  }): Promise<void> {
    await this.connection.query('INSERT INTO users (id, name, email, pass_hash) VALUES ($1, $2, $3, $4)',
      [userData.id, userData.name, userData.email, userData.passHash]);
  }
}

export default UserRepositoryPostgres;