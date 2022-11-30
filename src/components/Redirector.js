import { useNavigate } from "react-router-dom";
//import WithNavigate from "./Redirector2.js";

const Redirector = ({ msg, url }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(url);
  };

  return (
    <div className="redirection">
      <div>{msg}</div>
      <button className="go-button" onClick={goBack}>
        Ok, let's go !
      </button>
    </div>
  );
};
export default Redirector;
