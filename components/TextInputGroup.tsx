import React from 'react';

interface TextInputGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  isTextArea?: boolean;
  required?: boolean;
}

export const TextInputGroup: React.FC<TextInputGroupProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  isTextArea = false,
  required = false,
}) => {
  const commonProps = {
    name,
    id: name,
    value,
    onChange,
    placeholder,
    required,
    className: "w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-gray-200 placeholder-gray-500",
  };

  return (
    <div className="mb-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      {isTextArea ? (
        <textarea {...commonProps} rows={3}></textarea>
      ) : (
        <input type={type} {...commonProps} />
      )}
    </div>
  );
};
