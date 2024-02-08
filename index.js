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

  let keyArray = [];

  greenBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let url = `http://www.boredapi.com/api/activity?participants=${currentValue}`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        function addRow() {
          let table = document.querySelector("#tbody");
          let row = document.createElement("tr");
          table.appendChild(row);

          // Save button
          saveBtn = document.createElement("button");
          saveBtn.type = "button";
          saveBtn.className = "btn btn-primary save-btn";
          saveBtn.innerHTML = "Save";

          // Posting data to json server using the save button
          saveBtn.addEventListener("click", () => {
            return fetch("http://localhost:3000/data", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                activity: data.activity,
                type: data.type,
                accessibility: data.accessibility,
              }),
            }).then((response) => response.json());
          });

          // Delete button
          deleteBtn = document.createElement("button");
          deleteBtn.type = "button";
          deleteBtn.className = "btn btn-danger delete-btn";
          deleteBtn.innerHTML = "Delete";

          deleteBtn.addEventListener("click", deleteRow);

          // Create columns
          let c1 = document.createElement("td");
          let c2 = document.createElement("td");
          let c3 = document.createElement("td");
          let c4 = document.createElement("td");
          let c5 = document.createElement("td");

          // Activity data input into table
          c1.innerHTML = data.activity;
          c2.innerHTML = data.type.charAt(0).toUpperCase() + data.type.slice(1);
          c3.innerHTML = data.accessibility;
          c4.appendChild(saveBtn);
          c5.appendChild(deleteBtn);

          // Adding td element with activity info to tr element
          row.appendChild(c1);
          row.appendChild(c2);
          row.appendChild(c3);
          row.appendChild(c4);
          row.appendChild(c5);
        }

        // Appending/Pushing newly generated key into keyArray which stores the unique keys from activities already requested
        keyArray.push(data.key);
        console.log(keyArray);

        // Handling duplicates
        for (let key of keyArray) {
          if (key !== data.key) {
            continue;
          }
          return addRow();
        }
      })
      .catch((error) => {
        console.log(`Oops, there seems to be an error. Pls try again.`);
      });

    // Delete row function
    function deleteRow(event) {
      let td = event.target.parentNode;
      td.parentNode.remove();
    }
  });
}
