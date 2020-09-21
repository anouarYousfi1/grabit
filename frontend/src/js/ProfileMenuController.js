const ProfileMenuController = () => {
  const profile__Menu = document.querySelector(".profile__menu");
  const profile_Menu_item = document.getElementsByClassName(
    "profile__menu--item"
  );
  const dataHeader = document.querySelector(
    ".content__container--data--header"
  );
  const profileSettings = document.querySelector(".content__container--data");
  const profileAdresse = document.querySelector(".profile__adresse");
  const profileRequests = document.querySelector(".profile__requests");

  const array = [...profile_Menu_item];
  const active = "active";
  console.log(array);

  const ProfileMenuChoice = (event) => {
    const activeDiv = document.querySelector(".active");
    if (event.currentTarget && event.currentTarget.textContent) {
      const item = event.currentTarget;

      activeDiv.classList.remove(active);
      item.classList.add(active);
      dataHeader.innerHTML = item.textContent;

      switch (item.textContent) {
        case "Address":
          profileRequests.style.display = "none";
          profileSettings.style.display = "none";
          profileAdresse.style.display = "block";
          break;
        case "Profile Settings":
          profileSettings.style.display = "block";
          profileAdresse.style.display = "none";
          profileRequests.style.display = "none";
          break;
        case "Requests":
          profileSettings.style.display = "none";
          profileAdresse.style.display = "none";
          profileRequests.style.display = "block";
          break;
      }
    }

    profile__Menu.style.display = "none";
  };

  array.map((item) => item.addEventListener("click", ProfileMenuChoice));
};

export default ProfileMenuController;
