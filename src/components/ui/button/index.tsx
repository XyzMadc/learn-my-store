type Props = {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  children?: React.ReactNode;
  variant?: string;
};

export default function ButtonAuth({
  className,
  onClick,
  type,
  children,
  variant = "bg-blue-500 hover:bg-blue-700",
}: Props) {
  return (
    <button
      className={`${variant} flex w-full items-center justify-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
