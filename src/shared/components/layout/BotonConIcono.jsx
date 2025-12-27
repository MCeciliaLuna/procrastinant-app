function BotonConIcono({
  onClick,
  children,
  icon,
  iconPosition = 'left',
  type = 'button',
  disabled = false,
}) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {icon && iconPosition === 'left' && <span>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span>{icon}</span>}
    </button>
  );
}

export default BotonConIcono;
