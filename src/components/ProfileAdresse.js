import React from "react";

const ProfileAdresse = () => {
  return (
    <div className="profile__adresse">
      <div className="profile__adresse--content">
        <form action="">
          <label htmlFor="">Adress</label>
          <input type="text" defaultValue="address" />
          <label htmlFor="">Postal Code</label>
          <input type="text" defaultValue="60000" />
        </form>
      </div>
    </div>
  );
};

export default ProfileAdresse;
