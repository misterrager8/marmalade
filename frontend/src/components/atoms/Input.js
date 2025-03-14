export default function Input({
  value,
  onChange,
  type_ = "text",
  size = "sm",
  required = true,
  className = "",
  placeholder,
}) {
  return (
    <input
      placeholder={placeholder}
      required={required}
      type={type_}
      autoComplete="off"
      className={
        className + " form-control" + (size ? ` form-control-${size}` : "")
      }
      value={value}
      onChange={onChange}
    />
  );
}
