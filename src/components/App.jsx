import React, { useEffect, useState } from "react";
import "./App.css";
import { coordinates, apiKey } from "../utils/constants";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import Footer from "./Footer/Footer";

function App() {
  const [activeModal, setActiveModal] = useState(""); // modal closed by default
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const openAddGarmentModal = () => setActiveModal("add-garment");
  const closeModal = () => setActiveModal("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  useEffect(() => {
    getWeather({ ...coordinates, apiKey })
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>

      <ModalWithForm
        isOpen={activeModal === "add-garment"}
        onClose={closeModal}
        title="New garment"
        buttonText="Add garment"
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            required
          />
        </label>

        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="text"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
            required
          />
        </label>

        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>

          <label className="modal__label modal__label_type_radio">
            <input type="radio" name="weather" value="hot" required />
            Hot
          </label>

          <label className="modal__label modal__label_type_radio">
            <input type="radio" name="weather" value="warm" />
            Warm
          </label>

          <label className="modal__label modal__label_type_radio">
            <input type="radio" name="weather" value="cold" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeModal}
      />
      <Footer />
    </div>
  );
}

export default App;
