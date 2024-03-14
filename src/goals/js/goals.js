document.addEventListener("DOMContentLoaded", function () {
  const goalForm = document.getElementById("goalForm");
  const goalsList = document.getElementById("goalsList");
  const editGoalForm = document.getElementById("editGoalForm");
  const editGoalModal = new bootstrap.Modal(document.getElementById("editGoalModal"));

  goalForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const goalName = document.getElementById("goalName").value;
    const goalAmount = parseFloat(document.getElementById("goalAmount").value);
    const goalDate = document.getElementById("goalDate").value;

    if (!goalName || isNaN(goalAmount) || !goalDate) {
      alert("Please enter valid goal information.");
      return;
    }

    createGoalCard(goalName, goalAmount, goalDate);

    goalForm.reset();
  });

  function createGoalCard(name, amount, date) {
    const goalCard = document.createElement("div");
    goalCard.classList.add("card", "goal-card");
    goalCard.innerHTML = `
      <div class="card-header">
        ${name}
      </div>
      <div class="card-body">
        <p>Goal Amount: $${amount.toFixed(2)}</p>
        <p>Goal Date: ${date}</p>
        <button class="btn btn-sm btn-primary edit-goal" data-bs-toggle="modal" data-bs-target="#editGoalModal">Edit</button>
        <button class="btn btn-sm btn-danger delete-goal">Delete</button>
      </div>
    `;

    goalsList.appendChild(goalCard);
  }

  goalsList.addEventListener("click", function (e) {
    if (e.target.classList.contains("edit-goal")) {
      const goalCard = e.target.closest(".goal-card");
      const goalHeader = goalCard.querySelector(".card-header");
      const goalAmount = parseFloat(goalCard.querySelector(".card-body p").textContent.replace("Goal Amount: $", ""));
      const goalDate = goalCard.querySelector(".card-body p:nth-child(2)").textContent.replace("Goal Date: ", "");

      document.getElementById("editGoalName").value = goalHeader.textContent;
      document.getElementById("editGoalAmount").value = goalAmount;
      document.getElementById("editGoalDate").value = goalDate;

      editGoalForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const editedGoalName = document.getElementById("editGoalName").value;
        const editedGoalAmount = parseFloat(document.getElementById("editGoalAmount").value);
        const editedGoalDate = document.getElementById("editGoalDate").value;

        if (!editedGoalName || isNaN(editedGoalAmount) || !editedGoalDate) {
          alert("Please enter valid goal information.");
          return;
        }

        goalHeader.textContent = editedGoalName;
        goalCard.querySelector(".card-body p").textContent = `Goal Amount: $${editedGoalAmount.toFixed(2)}`;
        goalCard.querySelector(".card-body p:nth-child(2)").textContent = `Goal Date: ${editedGoalDate}`;

        // Close the modal
        editGoalModal.hide();
      });

      editGoalModal.show();
    } else if (e.target.classList.contains("delete-goal")) {
      const goalCard = e.target.closest(".goal-card");
      goalsList.removeChild(goalCard);
    }
  });
});
