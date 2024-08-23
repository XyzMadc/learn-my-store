type Props = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  variant?: string;
  className?: string;
  onChange?: (e: any) => void;
};

export default function InputAuth({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  disabled,
  variant = "text-gray-200",
  className,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">
      <label
        className={`${variant} ${className} text-lg font-semibold`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="shadow appearance-none font-semibold border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
}
