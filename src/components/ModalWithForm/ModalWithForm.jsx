import "./ModalWithForm.css";

function ModalWithForm({ isOpen, onClose, children, buttonText, title, name }) {
  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          aria-label="Close"
          onClick={onClose}
        ></button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" name={name}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
