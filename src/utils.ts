export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  return Object.keys(obj)
    .filter(value => keys.includes(value as K))
    .reduce((memo, value) => {
      memo[value as K] = obj[value as K];
      return memo;
    }, {} as T);
}
