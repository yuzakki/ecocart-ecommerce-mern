import { Dispatch, SetStateAction } from 'react';
import { Edit } from 'lucide-react';

interface IEditButtonProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function EditButton({ isOpen, setIsOpen }: IEditButtonProps) {
  return (
    <div className="flex flex-col items-end mt-5 basis-1/2">
      {!isOpen && (
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <Edit size={30} />
        </button>
      )}
    </div>
  );
}
