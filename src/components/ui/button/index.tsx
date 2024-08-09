type Props = {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  children?: React.ReactNode;
};

export default function ButtonAuth({
  className,
  onClick,
  type,
  children,
}: Props) {
  return (
    <button
      className={`bg-black flex w-full items-center justify-center hover:bg-slate-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
