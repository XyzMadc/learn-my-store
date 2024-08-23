import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  onClose: any;
  className?: string;
};

export default function Modal({ children, onClose, className }: Props) {
  const ref: any = useRef();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white rounded-lg overflow-hidden shadow-lg max-w-lg ${className} w-full text-black p-4 space-y-4`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
