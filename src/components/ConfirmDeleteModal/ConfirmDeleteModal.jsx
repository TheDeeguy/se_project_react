import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_confirm">
        <button type="button" className="modal__close" onClick={onClose}>
          ×
        </button>

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
    </div>
  );
}

export default ConfirmDeleteModal;
