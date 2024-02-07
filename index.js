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
      .then((data) => {
        let table = document.querySelector("#tbody");
        let row = document.createElement("tr");
        table.appendChild(row);

        // Save button
        saveBtn = document.createElement("button");
        saveBtn.type = "button";
        saveBtn.className = "btn btn-primary save-btn";
        saveBtn.innerHTML = "Save";

        // Delete button
        deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "btn btn-danger delete-btn";
        deleteBtn.innerHTML = "Delete";
      })
      .catch((error) => {
        console.log(`Oops, there seems to be an error. Pls try again.`);
      });
  });
}
