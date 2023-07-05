document.addEventListener("DOMContentLoaded", function() {
    // Fetch members' data from JSON and populate the table
    fetch("members.json")
      .then(response => response.json())
      .then(data => {
        const membersTableBody = document.querySelector("#members-table tbody");
        data.forEach(member => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td><button class="btn btn-danger delete-member" data-id="${member.id}">Delete</button></td>
          `;
          membersTableBody.appendChild(row);
        });
  
        // Attach event listeners to delete member buttons
        const deleteMemberButtons = document.querySelectorAll(".delete-member");
        deleteMemberButtons.forEach(button => {
          button.addEventListener("click", deleteMember);
        });
      });
  
    // Fetch trainers' data from JSON and populate the table
    fetch("trainers.json")
      .then(response => response.json())
      .then(data => {
        const trainersTableBody = document.querySelector("#trainers-table tbody");
        data.forEach(trainer => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${trainer.name}</td>
            <td>${trainer.specialization}</td>
            <td><button class="btn btn-danger delete-trainer" data-id="${trainer.id}">Delete</button></td>
          `;
          trainersTableBody.appendChild(row);
        });
  
        // Attach event listeners to delete trainer buttons
        const deleteTrainerButtons = document.querySelectorAll(".delete-trainer");
        deleteTrainerButtons.forEach(button => {
          button.addEventListener("click", deleteTrainer);
        });
      });
  
    // Member data modification form submission handler
    document.getElementById("member-form").addEventListener("submit", function(event) {
      event.preventDefault();
      const memberName = document.getElementById("member-name").value;
      const memberEmail = document.getElementById("member-email").value;
  
      // Update the member data in the JSON file or make an API call here
      console.log(`Updating member: ${memberName}, ${memberEmail}`);
      // ...
    });
  
    // Shift trainers modification form submission handler
    document.getElementById("trainer-form").addEventListener("submit", function(event) {
      event.preventDefault();
      const trainerName = document.getElementById("trainer-name").value;
      const trainerShift = document.getElementById("trainer-shift").value;
  
      // Update the trainer shift data in the JSON file or make an API call here
      console.log(`Updating trainer shift: ${trainerName}, ${trainerShift}`);
      // ...
    });
  
    // Delete member action
    function deleteMember(event) {
      const memberId = event.target.getAttribute("data-id");
  
      // Delete the member from the JSON file or make an API call here
      console.log(`Deleting member with ID: ${memberId}`);
      // ...
  
      // Remove the table row from the UI
      event.target.closest("tr").remove();
    }
  
    // Delete trainer action
    function deleteTrainer(event) {
      const trainerId = event.target.getAttribute("data-id");
  
      // Delete the trainer from the JSON file or make an API call here
      console.log(`Deleting trainer with ID: ${trainerId}`);
      // ...
  
      // Remove the table row from the UI
      event.target.closest("tr").remove();
    }
  });
  