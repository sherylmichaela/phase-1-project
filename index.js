document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  let greenBtn = document.querySelector("#greenBtn");
  let dropDown = document.querySelector("#dropdown");

  // Tooltip
  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  dropDown.addEventListener("change", handleSelectChange);
  function handleSelectChange(event) {
    currentValue = event.target.value;
  }
}
