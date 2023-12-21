const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Adds a task to the list
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  inputBox.value = ""; // clears input box
  saveData();
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
      if (inputBox.value === "") {
        alert("You must write something!");
      } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
      }

      inputBox.value = "";
      saveData();
    }
  });

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
