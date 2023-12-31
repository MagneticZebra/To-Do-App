const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const dueDateValue = document.getElementById("dueDateInput");

let isRunning = false;
let timerInterval;
const timerDisplay = document.getElementById('timer');
let time = 25; // amount of minutes
let timeRemaining = time * 60; // minutes in seconds

function updateDisplay() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timerInterval = setInterval(() => {
            timeRemaining--;
            updateDisplay();
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                resetTimer();
            }
        }, 1000); // 1000 means 1 second
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
}

function resetTimer() {
    stopTimer();
    timeRemaining = time * 60;
    updateDisplay();
}

function increaseTime() {
    time = time + 5;

    if(time >= 90) {
        time = 90;
    }

    timeRemaining = time * 60;
    updateDisplay();
}

function decreaseTime() {
    time = time - 5;

    if(time <= 5) {
        time = 5;
    }

    timeRemaining = time * 60;
    updateDisplay();
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('increase').addEventListener('click', increaseTime);
document.getElementById('decrease').addEventListener('click', decreaseTime);

updateDisplay();


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
