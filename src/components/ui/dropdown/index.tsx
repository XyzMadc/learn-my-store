import { useState } from "react";

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
  const [selectedValue, setSelectedValue] = useState(defaultValue || "");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
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
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`block w-full border border-gray-400 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
          disabled={disabled}
        >
          <div className="flex justify-between items-center">
            <span className="font-semibold">
              {selectedValue &&
                options.find((option) => option.value === selectedValue)?.label}
            </span>
            <svg
              className={`fill-current h-4 w-4 transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.5 7l4.5 4.5 4.5-4.5z" />
            </svg>
          </div>
        </button>
        <ul
          className={`transition-all duration-300 ease-in-out transform ${
            isOpen
              ? "opacity-100 max-h-60"
              : "opacity-0 max-h-0 pointer-events-none"
          } mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg overflow-auto focus:outline-none`}
          role="listbox"
          aria-labelledby={name}
        >
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={selectedValue === option.value}
              onClick={() => handleSelect(option.value)}
              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 ${
                selectedValue === option.value
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-900"
              } hover:bg-indigo-100`}
            >
              <span className="block truncate">{option.label}</span>
              {selectedValue === option.value && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 6.293a1 1 0 00-1.414 0L9 12.586 4.707 8.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
