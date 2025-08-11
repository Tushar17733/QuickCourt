import React, { createContext, useContext, useState } from 'react';

// Context for Popover state
const PopoverContext = createContext();

export const Popover = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  );
};

export const PopoverTrigger = ({ children }) => {
  const { open, setOpen } = useContext(PopoverContext);

  const toggle = () => setOpen(!open);

  return React.cloneElement(children, {
    onClick: toggle,
  });
};

export const PopoverContent = ({ children, className }) => {
  const { open } = useContext(PopoverContext);

  if (!open) return null;

  return (
    <div
      className={`absolute top-full right-0 z-50 mt-2 rounded-md border border-gray-200 bg-white p-4 shadow-lg ${className}`}
      style={{ minWidth: '16rem' }}
    >
      {children}
    </div>
  );
};
