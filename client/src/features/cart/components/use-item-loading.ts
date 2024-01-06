import { useState } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

export function useItemLoading() {
  const [loadingState, setLoadingState] = useState<LoadingState>({});

  const handleLoading = async (
    itemId: string,
    asyncFn: () => Promise<void>
  ) => {
    try {
      setLoadingState((prevState) => ({
        ...prevState,
        [itemId]: true,
      }));

      await asyncFn();

      setLoadingState((prevState) => ({
        ...prevState,
        [itemId]: false,
      }));
    } catch (error) {
      setLoadingState((prevState) => ({
        ...prevState,
        [itemId]: false,
      }));
    } finally {
      setLoadingState((prevState) => ({
        ...prevState,
        [itemId]: false,
      }));
    }
  };

  return { loadingState, handleLoading };
}
