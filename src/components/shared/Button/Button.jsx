import "./Button.css";

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  onClick,
  disabled = false,
  ariaLabel,
}) => (
  <button
    className={`ui-button ui-button--${variant} ${className}`.trim()}
    type={type}
    onClick={onClick}
    disabled={disabled}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default Button;
