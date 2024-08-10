type Options = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  options: Options[];
};

export default function Select({
  label,
  name,
  defaultValue,
  disabled = false,
  options,
}: Props) {
  return (
    <div className="mb-4">
      <label
        className="text-gray-700 text-lg font-semibold mb-1"
        htmlFor={name}
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          defaultValue={defaultValue}
          disabled={disabled}
          className={`block w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
            disabled ? "bg-gray-100 cursor-not-allowed" : ""
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.5 7l4.5 4.5 4.5-4.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
