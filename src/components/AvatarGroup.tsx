import React from 'react';

export const AvatarGroup: React.FC = () => {
  return (
    <div className="flex -space-x-3 overflow-hidden">
      <img
        className="inline-block size-10 rounded-full ring-2 ring-black"
        src="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
        alt="Amy Elsner"
      />
      <img
        className="inline-block size-10 rounded-full ring-2 ring-black"
        src="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png"
        alt="Asiya Javayant"
      />
      <img
        className="inline-block size-10 rounded-full ring-2 ring-black"
        src="https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png"
        alt="Onya Malimba"
      />
      <img
        className="inline-block size-10 rounded-full ring-2 ring-black"
        src="https://primefaces.org/cdn/primeng/images/demo/avatar/walter.jpg"
        alt="Walter"
      />
    </div>
  );
};
