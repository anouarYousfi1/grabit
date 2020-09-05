import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import "../../style/Logout.css";
import { userContext } from "../../contexts/userContext";

const Logout = (props) => {
  const [User, setUser] = useContext(userContext);
  const history = useHistory();

  const fetchData = () => {
    fetch(props.url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setUser({
            isLoggedIn: false,
            userID: "",
            name: "",
            email: "",
            picture: "",
          });
          history.push("/");
          console.log("logged out succesfully ");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="logout">
      <h4>
        <input type="button" value="logout" onClick={fetchData} />
      </h4>
    </div>
  );
};

export default Logout;
