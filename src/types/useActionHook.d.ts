interface ActionCallbacks<U> {
  /**
   * Function to execute when the action is successful
   * @param data The data returned by the action
   */
  onSuccess?: (data: U) => void;

  /**
   * Function to execute when the action fails
   * @param error The error thrown by the action
   */
  onError?: (error: any) => void;
}

interface UseActionHookOptions<T> {
  /**
   * Whether to execute the action on component mount
   */
  executeOnMount?: boolean;

  /**
   * The initial data to set
   */
  initialData?: T;
}

interface UseActionHook<T, U> {
  /**
   * Whether the action is pending
   */
  isPending: boolean;

  /**
   * The data returned by the action
   */
  data: U | null;

  /*
   * Function to execute the action
   * @param data The data to send to the action
   */
  execute: (data?: T, callbacks?: ActionCallbacks<U>) => Promise<void>;
}
