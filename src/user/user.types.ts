export type User = {
  userId: string;
  deviceId: string;
  createdAt: string;
  updatedAt: string;
  salesperson_id: string;
};

export type CreateUserPayload = Optional<
  Omit<User, 'createdAt' | 'updatedAt'>,
  'deviceId'
>;

export type CreateUser = Optional<User, 'deviceId'>;
