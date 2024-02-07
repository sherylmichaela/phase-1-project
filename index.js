document.addEventListener("DOMContentLoaded", initialize);

function initialize() {
  let greenBtn = document.querySelector("#greenBtn");
  let dropDown = document.querySelector("#dropdown");

  // Tooltip
  $(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  // Event listener to access selected number inside dropdown menu
  dropDown.addEventListener("change", handleSelectChange);
  function handleSelectChange(event) {
    currentValue = event.target.value;
  }

  greenBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let url = `http://www.boredapi.com/api/activity?participants=${currentValue}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {})
      .catch((error) => {
        console.log(`Oops, there seems to be an error. Pls try again.`);
      });
  });
}
