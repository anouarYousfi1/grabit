const getOrderState = (orderStatus) => {
  const select__form = document.querySelector("#select__form");

  let optionsArray = [...select__form];

  optionsArray.forEach((option) => {
    if (option.value === orderStatus) {
      option.setAttribute("selected", "");
    }
  });
};

export default getOrderState;
