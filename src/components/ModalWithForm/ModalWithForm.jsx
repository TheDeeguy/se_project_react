import "./ModalWithForm.css";

function ModalWithForm({ activeModal, onClose, children, buttonText, title }) {
  return (
    <div
      className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}
    >
      <div className="modal__content">
        <button type="button" className="modal__close" onClick={onClose}>
          X
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form">
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
