function BotonConIcono({
  onClick,
  children,
  icon,
  iconPosition = "left",
  type = "button",
  disabled = false,
  className = "",
  iconSize = "24",
  "aria-label": ariaLabel,
}) {
  const renderIcon = () => {
    if (typeof icon === "string") {
      return (
        <img
          src={icon}
          alt=""
          role="presentation"
          width={iconSize}
          height={iconSize}
          className="inline-block"
        />
      );
    }
    return <span className="inline-block">{icon}</span>;
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label={ariaLabel}
    >
      {icon && iconPosition === "left" && renderIcon()}
      {children}
      {icon && iconPosition === "right" && renderIcon()}
    </button>
  );
}

export default BotonConIcono;
