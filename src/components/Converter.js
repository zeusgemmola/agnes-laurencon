import CurrencySelector from "./CurrencySelector.js";
import Amount from "./Amount.js";
import Result from "./Result.js";
import React, { useEffect, useState, useRef } from "react";

const Converter = ({ prop }) => {
  const [oldCurrency, setOldCurrency] = useState("EUR");
  const [newCurrency, setNewCurrency] = useState("EUR");
  const [amount, setAmount] = useState(prop === "404" ? 404 : 0);
  const [inputClass, setInputClass] = useState(prop === "404" ? "valid" : "");
  const [rate, setRate] = useState(1);
  const [result, setResult] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);

  const usePrevious = (value) => {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  };

  const previousOldCurrency = usePrevious(oldCurrency);
  const previousNewCurrency = usePrevious(newCurrency);

  const getRegexForTesting = () => new RegExp("^[0-9]+([.][0-9][0-9]?)?$");
  const getRegexForSlicing = () => new RegExp("^0[0-9]");

  const testRegex = (input, getRegex) => {
    const regex = getRegex();
    const bool = regex.test(input);
    return bool;
  };
  const sliceZeros = (input) => {
    const regex = getRegexForSlicing();
    if (!regex.test(input)) {
      return input;
    }
    const inputSliced = input.slice(1);
    return sliceZeros(inputSliced);
  };

  const testRegexWithCallback = (callback, input) => {
    return callback(testRegex(input, getRegexForTesting), input);
  };

  const determineInputClass = (bool) => (bool ? "valid" : "invalid");

  const formateInput = (bool, input) => (bool ? sliceZeros(input) : input);

  const determineInputClassWithRegexTest = (input) =>
    testRegexWithCallback(determineInputClass, input);

  const formateInputWithRegexTest = (input) =>
    testRegexWithCallback(formateInput, input);

  const setAmountAndClassFormatted = (input) => {
    setAmount(formateInputWithRegexTest(input));
    setInputClass(determineInputClassWithRegexTest(input));
  };

  useEffect(() => {
    const getNewRate = async () => {
      setShowSpinner(true);
      const url =
        "https://api.currencyapi.com/v3/latest?apikey=K2D81jm8jFUf6mWlCrI7MVnSrx905O1TC0n6yWiw&currencies=EUR,USD,CHF,GBP&base_currency=" +
        oldCurrency;

      try {
        await fetch(url)
          .then((response) => (response.ok ? response.json() : response.status))
          .then((jsonContent) => {
            setRate(jsonContent.data[newCurrency].value);
          });
      } catch {
        console.log("erreur");
      }
      setShowSpinner(false);
    };

    if (amount !== 0 && inputClass === "valid") {
      if (oldCurrency === newCurrency) {
        setRate(1);
      } else if (
        previousOldCurrency !== oldCurrency ||
        previousNewCurrency !== newCurrency
      ) {
        getNewRate();
      }
    }
    Number.isNaN(amount * rate) ? setResult(0) : setResult(amount * rate);
  }, [
    oldCurrency,
    newCurrency,
    amount,
    previousNewCurrency,
    previousOldCurrency,
    rate,
    inputClass
  ]);

  return (
    <div className="container">
      <div className="row">
        <h3>Convertisseur</h3>

        <div className="col s8">
          <div className="row">
            <CurrencySelector
              label="From"
              id="inputDevises"
              currency={oldCurrency}
              setCurrency={setOldCurrency}
            />
            <CurrencySelector
              label="To"
              id="outputDevises"
              currency={newCurrency}
              setCurrency={setNewCurrency}
            />
          </div>

          <div className="row">
            <Amount
              value={amount}
              setValue={setAmount}
              setClassAndFormattedValue={setAmountAndClassFormatted}
              inputClass={inputClass}
            />
            <Result result={result} showSpinner={showSpinner} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;
