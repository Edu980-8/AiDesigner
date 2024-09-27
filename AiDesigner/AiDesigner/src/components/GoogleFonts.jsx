import { useState, useEffect } from "react";

const GoogleFonts = ({ initialFont, onFontChange }) => {
  const [fonts, setFonts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFont, setSelectedFont] = useState(initialFont); // Fuente inicial

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const response = await fetch(
          "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyCP8s9auXVpIPUu7N0TF2fV2TPYAvOc-kk"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setFonts(data.items);

        // Verificar si la fuente inicial está en la lista de fuentes
        if (!data.items.some((font) => font.family === initialFont)) {
          setSelectedFont(data.items[0]?.family || "Roboto"); // Fallback si initialFont no está
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFonts();
  }, [initialFont]);

  useEffect(() => {
    // Llamar al callback para informar al componente padre
    if (onFontChange) onFontChange(selectedFont);

    // Cargar la fuente seleccionada dinámicamente desde Google Fonts
    const link = document.createElement("link");
    link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.replace(
      / /g,
      "+"
    )}&display=swap`;
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, [selectedFont, onFontChange]);

  const handleFontChange = (e) => {
    const newFont = e.target.value;
    setSelectedFont(newFont); // Actualiza la fuente seleccionada
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex  flex-col items-center justify-center mt-5 mb-5 w-full">
      <div className="flex flex-row items-center justify-center mb-5 w-full gap-5">
        <h1 className="w-[50%] text-center">Tipo de fuente</h1>
        <div className="w-[40%] ">
          <select
            className="w-[100%] border border-gray-300 p-2 focus:outline-none"
            value={selectedFont}
            onChange={handleFontChange}
          >
            {fonts.map((font, id) => (
              <option key={id} value={font.family}>
                {font.family}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Texto de vista previa con la fuente seleccionada */}
      <div style={{ fontFamily: selectedFont }} className="">
        <h2 className="text-2xl">Vista  de {selectedFont}</h2>
        <p className="text-lg mt-3">Así se ve en un párrafo</p>
      </div>
    </div>
  );
};

export default GoogleFonts;
