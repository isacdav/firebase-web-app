import { useCallback, useEffect, useState } from 'react';

/**
 * Hook to execute in client a server action and handle its state
 * @template T The type of the input data
 * @template U The type of the output data
 * @param {ServerAction<T, U>} action The server action to execute
 * @param {any} options The options for the action execution - not implemented yet
 */
export function useAction<T, U>(
  action: ServerAction<T, U>,
  options: UseActionHookOptions<T> = {},
): UseActionHook<T, U> {
  const [data, setData] = useState<U | null>(null);
  const [isPending, setIsPending] = useState(false);

  const execute = useCallback(
    async (data?: T, { onSuccess, onError }: ActionCallbacks<U> = {}) => {
      setData(null);
      setIsPending(true);

      try {
        const result = await action(data);

        if (result.validationError ?? result.error) {
          onError?.(result.validationError ?? result.error);
          return;
        }

        if (result.data) {
          setData(result.data);
          onSuccess?.(result.data);
        }
      } catch (error) {
        onError?.(error);
      } finally {
        setIsPending(false);
      }
    },
    [action],
  );

  useEffect(() => {
    if (options.executeOnMount) {
      execute(options.initialData);
    }
  }, []);

  return {
    isPending,
    data,
    execute,
  };
}
