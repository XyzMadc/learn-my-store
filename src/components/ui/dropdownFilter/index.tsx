import { FC, useState } from "react";

interface FilterDropdownProps {
  label: string;
  options: string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
}

const FilterDropdown: FC<FilterDropdownProps> = ({
  label,
  options,
  selectedOptions,
  onToggle,
}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button
        className="flex justify-between items-center w-full"
        onClick={() => setOpen(!isOpen)}
      >
        <h3 className="font-bold">{label}</h3>
        <p
          className={`text-2xl ${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-300 ease-in-out`}
        >
          <i className="bx bx-chevron-down" />
        </p>
      </button>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-40" : "max-h-0"
        }`}
      >
        <div className="space-y-2">
          {options.map((option) => (
            <label
              key={option}
              onClick={() => onToggle(option)}
              className="flex items-center cursor-pointer w-max gap-2"
            >
              <div
                className={`w-5 h-5 border border-black flex items-center justify-center rounded ${
                  selectedOptions.includes(option) ? "bg-black" : "bg-white"
                }`}
              >
                {selectedOptions.includes(option) && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414-1.414l-7 7-2.5-2.5a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l8-8z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
      <hr />
    </>
  );
};

export default FilterDropdown;
