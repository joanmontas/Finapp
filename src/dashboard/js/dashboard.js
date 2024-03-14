document.addEventListener("DOMContentLoaded", function () {
  const goalCountElement = document.getElementById("goalCount");

  const savedGoals = JSON.parse(localStorage.getItem("goals")) || [];

  goalCountElement.textContent = savedGoals.length.toString();


});
