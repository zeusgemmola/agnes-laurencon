import { useEffect } from "react";

const Amount = ({ value, setValue, setClassAndFormattedValue, inputClass }) => {
  const handleChange = (event) => {
    setClassAndFormattedValue(event.target.value);
  };

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    <div className="input-field col s12">
      <label htmlFor="amount" type="number">
        Montant
      </label>
      <input
        id="amount"
        type="text"
        className={inputClass}
        value={value}
        onChange={handleChange}
      />
      <span
        className="helper-text"
        data-error="Erreur"
        data-success="Valide"
      ></span>
    </div>
  );
};

export default Amount;
