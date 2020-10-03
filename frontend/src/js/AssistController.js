const AssistController = () => {
  const dropDownMenus = document.getElementsByClassName("dropdown");

  let array = Array.from(dropDownMenus);

  array.forEach((dropDownMenu) => {
    if (dropDownMenu && dropDownMenu.firstChild.hasAttribute("hidden")) {
      dropDownMenu.firstChild.removeAttribute("hidden");
      dropDownMenu.firstChild.textContent = "Order status";
      dropDownMenu.style.marginTop = "0px";
      dropDownMenu.style.cssFloat = "none";
    }
  });
};

export default AssistController;
