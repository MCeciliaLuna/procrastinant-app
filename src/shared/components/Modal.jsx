function Modal({ isOpen, onClose, children, title }) {
  if (!isOpen) return null;

  return (
    <div>
      <div>
        {title && <h2>{title}</h2>}
        <button onClick={onClose}>Cerrar</button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
