document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  let greenBtn = document.querySelector("#greenBtn");
  let dropDown = document.querySelector("#dropdown");

  dropDown.addEventListener("change", handleSelectChange);
  function handleSelectChange(event) {
    currentValue = event.target.value;
  }
}
