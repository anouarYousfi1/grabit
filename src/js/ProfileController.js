const ProfileController = () => {
  const choice = document.getElementsByClassName("profile_choice");
  const dataHeader = document.querySelector(
    ".content__container--data--header"
  );
  const profileSettings = document.querySelector(".content__container--data");
  const profileAdresse = document.querySelector(".profile__adresse");
  const profileRequests = document.querySelector(".profile__requests");

  const array = Array.from(choice);
  const active = "active";

  const toggleActive = (ch) => {
    const activeDiv = document.querySelector(".active");
    activeDiv.classList.remove(active);
    ch.currentTarget.className += " " + active;
    dataHeader.innerHTML = ch.currentTarget.textContent;

    switch (ch.currentTarget.textContent) {
      case "Adresse":
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
  };

  array.map((ch) => ch.addEventListener("click", toggleActive));
};

export default ProfileController;
