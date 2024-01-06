import { ChangeEvent } from 'react';
import { useUpdateUser } from '@features/authentication/hooks/use-user';

export const useFileUpload = (fileName: string) => {
  const { updateUserData, isLoading } = useUpdateUser();

  let selectedFile: File | undefined;
  const handleFileUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const formData = new FormData();
      formData.append(fileName, selectedFile);
      updateUserData(formData);
    }
  };

  return { handleFileUpload, selectedFile, isLoading };
};
