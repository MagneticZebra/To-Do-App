const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dueDateValue = document.getElementById("dueDateInput");

// doesn't allow users to select a due date in the past
function setMinDate() {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // formats to YYYY-MM-DD

  const dateInput = document.getElementById("dueDateInput");
  dateInput.setAttribute("min", formattedDate);
}

setMinDate();

// Adds a task to the list
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    // Adds task to list
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    // Adds due date to list
    let date = document.createElement("date");
    date.className = "dueDateDisplay";
    date.innerHTML = dueDateValue.value;
    li.appendChild(date);

    // Creates "x" button
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = ""; // clears input box
  saveData();
}

// Shows or hides the date selector
function showDueDateInput() {
  if(document.getElementById("dueDateInput").style.display=="none") {
    document.getElementById("dueDateInput").style.display="block";
  } else {
    document.getElementById("dueDateInput").style.display="none";
    document.getElementById("dueDateInput").value=''; // clears due date value
  }
}

// Event listener for checking off and deleting tasks
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

// Event listener for enter button
document
  .getElementById("input-box")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

// saves data in local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// displays data stored in local storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
