import User from '../../src/domain/entities/User';
import UserRepository from '../../src/domain/repositories/UserRepository';

export default class InMemoryUserRepository implements UserRepository {
  private users: User[] = [
    new User('1', 'user1', 'user1@mail.com', 'pass_hash_user1'),
    new User('2', 'user2', 'user2@mail.com', 'pass_hash_user2'),
    new User('3', 'foobar1', 'foobar1@mail.com', 'bb07d9e8302b1906a04ad1ec7d8fa6caccddfba263bd45c0a810f069de31c47d')
  ];

  async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  async findByCredentials(email: string, passHash: string): Promise<User | null> {
    return this.users.find(user => user.email === email && user.passHash === passHash) || null;
  }

  async registerUser(userData: { name: string; email: string; passHash: string; }): Promise<void> {
    this.users.push(new User(`${this.users.length + 1}`, userData.name, userData.email, userData.passHash));
  }
}