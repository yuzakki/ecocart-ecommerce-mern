// Imports: Libraries
import { useState } from 'react';

// Imports: Components
import { EditButton } from './edit-button';
import { UserDetailsContent } from './user-details-content';

export default function UserDetails() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-lg basis-4/6">
      <div className="pb-6 space-y-1 border-b mb-7">
        <h2 className="text-lg font-bold">Profile</h2>
        <p>Your personal account</p>
      </div>

      <div className="flex flex-col-reverse justify-between pb-12 md:flex-row">
        <UserDetailsContent isOpen={isOpen} setIsOpen={setIsOpen} />
        <EditButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
}
