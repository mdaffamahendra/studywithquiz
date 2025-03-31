
const Input = (props) => {
  const {
    type,
    name,
    max,
    min,
    accept,
    onChange = () => {},
    value,
    placeholder = "",
    readonly = false,
    required = true,
    className = "w-full text-sm md:text-md p-2 mt-1 md:p-3 md:mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-indigo-600",
    checked = false,
  } = props;


  return (
    <input
      type={type}
      id={name}
      value={value}
      name={name}
      accept={accept}
      maxLength={max}
      minLength={min}
      readOnly={readonly}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete="off"
      className={className}
      checked={checked}
    />
  );
};

export default Input;
