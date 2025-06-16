import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  variant = 'primary',
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle = "font-semibold py-2.5 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-150 ease-in-out flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed";
  
  let variantStyle = '';
  switch (variant) {
    case 'secondary':
      variantStyle = 'bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-400';
      break;
    case 'danger':
      variantStyle = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      break;
    case 'primary':
    default:
      variantStyle = 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white focus:ring-purple-500';
      break;
  }

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
};

