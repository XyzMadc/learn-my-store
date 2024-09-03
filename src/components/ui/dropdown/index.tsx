import React from "react";

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  label: string;
  name: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Option[];
  onChange?: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  defaultValue,
  disabled = false,
  options,
  onChange,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (onChange) onChange(value);
  };

  return (
    <div className="mb-4">
      <label
        className="text-gray-700 text-lg font-semibold mb-1"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={handleSelectChange}
        className={`block w-full border border-gray-400 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
          disabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
      >
        {/* Render options */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
