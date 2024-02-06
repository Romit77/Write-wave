export default function Button({
  //eslint-disable-next-line
  children,
  //eslint-disable-next-line
  type = "button",
  //eslint-disable-next-line
  bgColor = "bg-blue-600",
  //eslint-disable-next-line
  textColor = "text-white",
  //eslint-disable-next-line
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
