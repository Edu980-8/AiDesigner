const InputField = ({ label, options = [], value, onChange, type = "text", placeholder }) => {
    // Si hay opciones, renderiza un select, de lo contrario, renderiza un input
    const isDropdown = options.length > 0;
  
    return (
      <div className="flex gap-5 flex-row items-center justify-center mt-5 mb-5 w-full">
        <p className="w-[50%] text-center ">{label}</p>
        {isDropdown ? (
          <select
            className="border border-gray-300 p-2 focus:outline-none w-[40%]"
            placeholder={placeholder}
            onChange={onChange}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            className="p-2 focus:outline-none w-[40%]"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    );
  };
  
  export default InputField;
  