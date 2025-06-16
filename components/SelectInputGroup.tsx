import React from 'react';
import { SelectOption } from '../types';

interface SelectInputGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
}

export const SelectInputGroup: React.FC<SelectInputGroupProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <div className="mb-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors text-gray-200"
      >
        {options.map(option => (
          <option key={option.value} value={option.value} disabled={option.value === "" && option.label.toLowerCase().includes("select")}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
