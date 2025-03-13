export default function Button({
  onClick,
  type_ = "button",
  size = "sm",
  active,
  border = true,
  icon,
  text,
  className = "",
  link = false,
  href,
}) {
  return (
    <>
      {link ? (
        <a
          target="_blank"
          href={href}
          className={
            className +
            " btn" +
            (size ? ` btn-${size}` : "") +
            (!border ? " border-0" : "")
          }>
          {icon && <i className={"bi bi-" + icon + (text ? " me-2" : "")}></i>}
          {text}
        </a>
      ) : (
        <button
          onClick={onClick}
          type={type_}
          className={
            className +
            " btn" +
            (size ? ` btn-${size}` : "") +
            (active ? " active" : "") +
            (!border ? " border-0" : "")
          }>
          {icon && <i className={"bi bi-" + icon + (text ? " me-2" : "")}></i>}
          {text}
        </button>
      )}
    </>
  );
}
