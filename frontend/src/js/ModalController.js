const modalController = () => {
  const modal = document.querySelector(".modal__container");
  const container = document.querySelector(".container__modal");
  const signin = document.querySelector("#login");

  window.onclick = (e) => {
    if (container !== null && container !== undefined && e.target === container)
      container.style.display = "none";
  };

  const displayModal = () => {
    if (container !== null && container !== undefined)
      container.style.display = "flex";
  };

  if (signin != null) signin.addEventListener("click", displayModal);
};

export default modalController;
