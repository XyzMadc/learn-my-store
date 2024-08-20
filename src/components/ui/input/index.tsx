type Props = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
};

export default function InputAuth({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  disabled,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-gray-200 text-lg font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        className="shadow appearance-none font-semibold border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </div>
  );
}
