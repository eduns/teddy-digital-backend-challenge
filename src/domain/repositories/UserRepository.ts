import User from '../entities/User';

interface UserRepository {
  findById (id: string): Promise<User | null>;
  findByCredentials (email: string, passHash: string): Promise<User | null>;
  registerUser (userData: { name: string; email: string; passHash: string; }): Promise<void>;
}

export default UserRepository;