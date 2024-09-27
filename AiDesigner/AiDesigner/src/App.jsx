import { useState } from "react";
import InputField from "./components/InputField";
import Color_Selector from "./components/Color_Selector";
import GoogleFonts from "./components/GoogleFonts";
import Modal from "./components/Modal"; // Asegúrate de tener un componente Modal

const filter_information = [
  {
    industry_value: ["Comercial", "Tecnologico", "Industrial"],
    style_types: ["Retro", "Vintage", "Moderno"],
    principal_color: ["Rojo", "Azul", "Verde"],
    typography: ["Cursiva", "Normal", "Negrita"],
    number_columns: ["2", "3", "4"],
    menu: ["1", "2", "Ninguno"],
    bocetos: [],
  },
];

function App() {
  const [selectedValues, setSelectedValues] = useState({
    industry: "",
    style: "",
    color: "",
    typography: "",
    columns: "",
    menu: "",
    bocetos: null,
  });

  const [selectedFont, setSelectedFont] = useState("Teacher");
  const [modalVisible, setModalVisible] = useState(false);

  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleColorChange = (newColor) => {
    setSelectedValues((prev) => ({
      ...prev,
      color: newColor,
    }));
  };

  const handleFontChange = (font) => {
    setSelectedFont(font);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const isFormValid =
    selectedValues.industry &&
    selectedValues.style &&
    selectedValues.columns &&
    selectedValues.menu &&
    selectedValues.bocetos;

  return (
    <div className="flex flex-col text-center bg-black min-h-screen items-center justify-center w-full px-4">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">
        AiDesigner
      </h1>
      <div className="flex flex-col items-center w-full max-w-lg bg-gray-200 rounded-lg shadow-lg p-6">
        <InputField
          label="Tipo de Industria"
          options={filter_information[0].industry_value}
          onChange={handleChange("industry")}
        />
        <InputField
          label="Estilo deseado"
          options={filter_information[0].style_types}
          onChange={handleChange("style")}
        />
        <Color_Selector initialColor="#fff" onColorChange={handleColorChange} />
        <GoogleFonts
          initialFont={selectedFont}
          onFontChange={handleFontChange}
        />
        <InputField
          label="# Columnas"
          options={filter_information[0].number_columns}
          onChange={handleChange("columns")}
        />
        <InputField
          label="Menús"
          options={filter_information[0].menu}
          onChange={handleChange("menu")}
        />
        <InputField
          label="Bocetos"
          type="file"
          onChange={(e) =>
            setSelectedValues({ ...selectedValues, bocetos: e.target.files })
          }
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded w-full mt-4"
          onClick={openModal}
        >
          Enviar
        </button>
      </div>

      {modalVisible && <Modal onClose={closeModal} />}
    </div>
  );
}

export default App;
