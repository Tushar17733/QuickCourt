import React from 'react';

export const Button = ({ children, className = '', variant = 'default', ...props }) => {
  let baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-4 py-2';

  let variantClasses = '';

  switch (variant) {
    case 'outline':
      variantClasses = 'border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700';
      break;
    case 'destructive':
      variantClasses = 'bg-red-600 text-white hover:bg-red-700';
      break;
    case 'link':
      variantClasses = 'text-blue-600 hover:underline bg-transparent p-0';
      break;
    default:
      variantClasses = 'bg-blue-600 text-white hover:bg-blue-700';
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${className}`} {...props}>
      {children}
    </button>
  );
};
