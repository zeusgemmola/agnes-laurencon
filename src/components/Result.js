import Spinner from "./Spinner/index.js";
const Result = ({ result, showSpinner }) => {
  return (
    <div className="input-field col s12">
      <h5>Result : {showSpinner ? <Spinner /> : result}</h5>
    </div>
  );
};

export default Result;
