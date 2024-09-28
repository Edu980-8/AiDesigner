const Post_to_back = ({ selectedValues,selectedFont, openModal }) => {
  const handle_Submit = async () => {
    const formData = new FormData();

    // Agregar los valores del formulario al FormData
    formData.append("industry", selectedValues.industry);
    formData.append("style", selectedValues.style);
    formData.append("color", selectedValues.color);
    formData.append("font", selectedFont);
    formData.append("columns", selectedValues.columns);
    formData.append("menu", selectedValues.menu);

    // Adjuntar los bocetos (archivos)
    if (selectedValues.bocetos) {
      Array.from(selectedValues.bocetos).forEach((file) => {
        formData.append("bocetos", file);
      });
    }

    try {
      // Hacer el POST al backend
      const response = await fetch("http://127.0.0.1:5000/generate-design", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Proyecto enviado con éxito:", data);
        openModal(); // Abrir el modal si el envío fue exitoso
      } else {
        console.log("Error al enviar el proyecto");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded w-full mt-4"
        onClick={handle_Submit}
      >
        Enviar Proyecto
      </button>
    </div>
  );
};

export default Post_to_back;
