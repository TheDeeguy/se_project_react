import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <ModalWithForm
      title=""
      name="confirm-delete"
      isOpen={isOpen}
      onClose={onClose}
      extraClass="modal__content_type_confirm"
    >
      <div className="confirm-modal">
        <p className="confirm-modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>

        <div className="confirm-modal__actions">
          <button
            type="button"
            className="confirm-modal__delete-btn"
            onClick={onConfirm}
          >
            Yes, delete
          </button>

          <button
            type="button"
            className="confirm-modal__cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
}

export default ConfirmDeleteModal;
