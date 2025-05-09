type ButtonType = {
    className?: string;
    atalho?: string;
    label?: string;
}
const Button = ({ className, atalho, label }: ButtonType) => {
  return (
    <button className={"border border-[#dce0e8] bg-gray-50 rounded-full h-full px-6 text-sm font-semibold " + className}>
    {label}{" "}
    {atalho && <span className="text-gray-400 pl-1 font-normal">{atalho}</span>}
  </button>
  );
};

export default Button;
