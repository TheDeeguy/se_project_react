import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirm();
  }

  return (
    <ModalWithForm
      title="Delete item?"
      name="confirm-delete"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Yes, delete"
      extraClass="modal__content_type_confirm"
    >
      <p className="confirm-modal__text">
        Are you sure you want to delete this item? This action is irreversible.
      </p>

      <button
        type="button"
        className="confirm-modal__cancel-btn"
        onClick={onClose}
      >
        Cancel
      </button>
    </ModalWithForm>
  );
}
export default ConfirmDeleteModal;
