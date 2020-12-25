import { useCallback, useMemo, useState } from 'react';

export type AsyncState<T> = {
  data?: T;
  error?: Error;
  isPending: boolean;
};

export type TryProps = {};

export type PromiseFn<T extends any = any> = (...args) => Promise<T>;
type ThenArg<F> = F extends Promise<infer U> ? U : unknown;

export function useTry<F extends PromiseFn, T extends ThenArg<ReturnType<F>>>(
  promiseFn: F,
  // option?: TryProps,
) {
  const [state, setState] = useState<AsyncState<T>>({ isPending: false });
  const $try = useCallback(
    async (...args: Parameters<F>) => {
      let data: T | undefined = undefined;
      try {
        setState((s) => ({ ...s, isPending: true }));
        data = await promiseFn(...args);
        setState((s) => ({ ...s, isPending: false, data }));
      } catch (error) {
        setState((s) => ({ ...s, isPending: false, error }));
        throw error;
      }

      return data;
    },
    [promiseFn],
  ) as F;

  const setData = useCallback((data: T) => {
    setState((s) => ({ ...s, data }));
  }, []);

  return useMemo(() => ({ ...state, $try, setData }), [$try, setData, state]);
}
