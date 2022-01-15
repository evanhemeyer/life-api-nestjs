declare type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

declare type AnyObject = Record<string, unknown>;
