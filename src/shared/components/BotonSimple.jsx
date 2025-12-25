function BotonSimple({ onClick, children, type = 'button', disabled = false }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default BotonSimple;
