export const ResetAllFactors = () => {
  // reset search box value
  document
    .querySelectorAll(".plugins-filter-input")
    .forEach((element) => (element.value = ""));

  ResetTypeValue("");
  ResetManuValue("");
};

export const ResetTypeValue = (typeName) => {
  document.querySelectorAll(".inner-button-text-type").forEach((element) => {
    element.innerHTML = typeName !== "" ? typeName : "type";
  });
};

export const ResetManuValue = (manuName) => {
  document
    .querySelectorAll(".inner-button-text-manu")
    .forEach(
      (element) => (element.innerHTML = manuName !== "" ? manuName : "factory")
    );
};
