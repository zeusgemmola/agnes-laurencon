import React from "react";

const CurrencySelector = ({ label, id, currency, setCurrency }) => {
  const currencies = [
    { code: "EUR" },
    { code: "CHF" },
    { code: "GBP" },
    { code: "USD" }
  ];

  const handleChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="col s6">
      <label>{label}</label>

      <select
        defaultValue={currency}
        className="browser-default"
        name={id}
        id={id}
        onChange={handleChange}
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
