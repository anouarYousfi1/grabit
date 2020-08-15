import React, { useContext } from "react";
import FacebookButton from "./FacebookButton";
import { SignupContext } from "../contexts/SignupContext";
import "../style/SignupCustomer.css";
import SignupHeader from "./SignupHeader";

const Signup = (props) => {
  const [Signups, setSignups] = useContext(SignupContext);

  return (
    <div className="signup__container">
      <SignupHeader />
      <div className="signup">
        <FacebookButton
          key={Signups[props.number].id}
          headline={Signups[props.number].headline}
          link={Signups[props.number].link}
          strong={Signups[props.number].strong}
        />
      </div>
    </div>
  );
};

export default Signup;
