import { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";

const Color_Selector = ({ initialColor = "#fff", onColorChange }) => {
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const pickerRef = useRef(null);
  const buttonRef = useRef(null);

  const handleChangeComplete = (color) => {
    setSelectedColor(color.hex);
    if (onColorChange) {
      onColorChange(color.hex); // Llama a la función pasada desde el padre
    }
  };

  const handleSelectClick = () => {
    setShowColorPicker((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      pickerRef.current &&
      !pickerRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setShowColorPicker(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center relative mb-5 mt-5 gap-5 w-full">
      {/* Para pantallas grandes, el texto está alineado a la derecha; en móviles, centrado */}
      <p className="lg:w-[50%] text-center lg:text-center  sm:text-center w-full">
        Color de diseño
      </p>

      {/* En pantallas grandes, el botón ocupa el 40%, en móviles, el 80% */}
      <div className="lg:w-[40%] sm:w-[80%] w-full flex justify-center relative">
        <button
          ref={buttonRef}
          className="w-full border border-gray-300 p-2"
          onClick={handleSelectClick}
          style={{ backgroundColor: selectedColor }}
        >
          {selectedColor}
        </button>

        {showColorPicker && (
          <div
            ref={pickerRef}
            className="absolute z-10"
            style={{
              top: "100%",
              left: 0,
              transform: "translateY(10px)",
              width: "auto", // Ajusta esto según sea necesario
              maxWidth: "300px" // Opcional, para limitar el ancho del color picker
            }}
          >
            <SketchPicker
              color={selectedColor}
              onChangeComplete={handleChangeComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Color_Selector;
