import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect } from "react";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };

  const { values, handleChange, resetForm } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values, resetForm); // Pass the reset function here
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Name */}
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
      </label>

      {/* Image */}
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="text"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>

      {/* Weather */}
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            required
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>

        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="modal__label modal__label_type_radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
