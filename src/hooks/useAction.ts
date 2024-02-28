import { useCallback, useState } from 'react';

interface UseActionOptions<U> {
  onSuccess?: (data: U) => void;
  onError?: (error: any) => void;
}

interface UseActionHook<T, U> {
  isPending: boolean;
  data: U | null;
  execute: (data?: T) => Promise<void>;
}

export function useAction<T, U>(action: ServerAction<T, U>, options: UseActionOptions<U> = {}): UseActionHook<T, U> {
  const [data, setData] = useState<U | null>(null);
  const [isPending, setIsPending] = useState(false);

  const execute = useCallback(
    async (data?: T) => {
      setData(null);
      setIsPending(true);

      try {
        const result = await action(data);

        if (!result) {
          throw new Error('No result');
        }

        if (result.validationError) {
          options?.onError?.(result.validationError);
          return;
        }

        if (result.error) {
          options?.onError?.(result.error);
          return;
        }

        if (result.data) {
          setData(result.data);
          options?.onSuccess?.(result.data);
        }
      } catch (error) {
        options?.onError?.(error);
      } finally {
        setIsPending(false);
      }
    },

    [action, options],
  );

  return {
    isPending,
    data,
    execute,
  };
}
