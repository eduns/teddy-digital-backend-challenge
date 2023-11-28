import User from '../entities/User';

interface UserRepository {
  findByCredentials (email: string, passHash: string): Promise<User | null>;
  registerUser (userData: {
    id: string;
    name: string;
    email: string;
    passHash: string;
  }): Promise<void>;
}

export default UserRepository;