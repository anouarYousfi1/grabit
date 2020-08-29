let orderitem = {};

const OrderController = () => {
  const pluses = document.getElementsByClassName(".Add");
  const minuses = document.getElementsByClassName(".Remove");
  const form = document.querySelector("#order__items--textinput--form");

  const plusesArray = [...pluses];
  const minusesArray = [...minuses];

  const toggle = (e) => {
    switch (e.currentTarget.className) {
      case "Add":
        e.currentTarget.classList.replace("Add", "Remove");
        break;
      case "Remove":
        e.currentTarget.classList.replace("Remove", "Add");
        break;
    }
  };

  plusesArray.forEach((plus) => {
    plus.addEventListener("click", toggle);
  });

  minusesArray.forEach((minus) => {
    minus.addEventListener("click", toggle);
  });

  const AddItem = (e) => {
    if (e.preventDefault) e.preventDefault();

    let orderName = form.elements["order__items--textinput--input"].value;

    orderitem = {
      orderName: orderName,
      state: "Remove",
    };

    localStorage.setItem("orderitem", orderitem);
  };

  form.addEventListener("submit", AddItem);
};

export default OrderController;
