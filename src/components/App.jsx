import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { coordinates, apiKey } from "../utils/constants";
import Header from "./Header/Header";
import Main from "./Main/Main";
import ModalWithForm from "./ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";
import Profile from "./Profile/Profile";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { addItem, getItems, removeItem } from "../utils/api.js";
import Footer from "./Footer/Footer";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../components/AddItemModal/AddItemModal.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal";

function App() {
  const [activeModal, setActiveModal] = useState(""); // modal closed by default
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  console.log(weatherData);
  const openAddGarmentModal = () => setActiveModal("add-garment");
  const closeModal = () => setActiveModal("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      weather: inputValues.weather,
      imageUrl: inputValues.imageUrl,
    };

    addItem(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather({ ...coordinates, apiKey })
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        console.log("Clothing items received:", data);
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (card) => {
    setItemToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;

    removeItem(itemToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete._id),
        );
        setItemToDelete(null);
        closeModal();
      })
      .catch(console.error);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleCardClick={handleCardClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onClose={closeModal}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeModal}
          onDeleteClick={handleDeleteClick}
        />
        <ConfirmDeleteModal
          isOpen={activeModal === "confirm-delete"}
          onClose={closeModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
