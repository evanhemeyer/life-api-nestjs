import { User } from '../src/user/user.types';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
