import "../css/Page404.css";
import { useState } from "react";
import Redirector from "./Redirector.js";

const Page404 = () => {
  const [message, setMessage] = useState();
  const [url, setUrl] = useState();

  const setState = (props) => {
    setMessage(props.msg);
    setUrl(props.url);
  };

  const handleClick = (event) => {
    const yesState = {
      msg: "Great ! I have the perfect app for you",
      url: "/with404"
    };
    const noState = {
      msg: "Don't worry, let's get you back on track",
      url: "/"
    };

    event.target.value === "yes"
      ? setState({ ...yesState })
      : setState({ ...noState });
  };

  return (
    <div>
      <h3>
        Trying to convert <br /> 404 € ?
      </h3>
      <div className="buttons">
        <button value="yes" onClick={handleClick}>
          YES !
        </button>
        <button value="no" onClick={handleClick}>
          HELL NO ! I'm just lost
        </button>
      </div>

      {message && <Redirector msg={message} url={url} />}
    </div>
  );
};

export default Page404;
