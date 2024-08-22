type Props = {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  children?: React.ReactNode;
  variant?: string;
  disabled?: boolean;
};

export default function ButtonAuth({
  className,
  onClick,
  type,
  children,
  disabled,
  variant = "bg-blue-500 hover:bg-blue-700",
}: Props) {
  return (
    <button
      className={`${variant} flex w-full items-center justify-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className} transition-all duration-100 ease-in`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
