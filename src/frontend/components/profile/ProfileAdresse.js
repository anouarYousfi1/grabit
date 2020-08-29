import React from "react";

const ProfileAdresse = () => {
  return (
    <div className="profile__adresse">
      <div className="profile__adresse--content">
        <form action="">
          <label htmlFor="">Adress</label>
          <input type="text" placeholder="address" />
          <label htmlFor="">Postal Code</label>
          <input type="text" placeholder="60000" />
          <label htmlFor="">City</label>
          <input type="text" placeholder="new york" />
          <input type="submit" value="Update" />
        </form>
      </div>
    </div>
  );
};

export default ProfileAdresse;
