
type InputType = {
    value?: string | number
    type?: string
}
const Input = ({ value, type }: InputType) => {
  return (
    <input
    type={type ?? 'text'}
    className="border border-[#dce0e8] rounded-md px-2 py-4 text-lg"
    value={value}
  />
  );
};

export default Input;
