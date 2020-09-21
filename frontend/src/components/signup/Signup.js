import React, { useContext } from "react";
import FacebookButton from "../common/FacebookButton";
import { SignupContext } from "../../contexts/SignupContext";
import "../../style/SignupCustomer.css";
import SignupHeader from "../common/SignupHeader";

const Signup = (props) => {
  const [Signups, setSignups] = useContext(SignupContext);
  const mode = "signup";

  return (
    <div className="signup__container">
      <SignupHeader />
      <div className="signup__container--content">
        <div className="signup">
          <FacebookButton
            key={Signups[props.number].id}
            headline={Signups[props.number].headline}
            link={Signups[props.number].link}
            strong={Signups[props.number].strong}
            number={props.number}
            mode={mode}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
