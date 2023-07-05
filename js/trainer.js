document.addEventListener("DOMContentLoaded", function() {
    // Fetch member data from JSON and populate the attendance table
    fetch("members.json")
      .then(response => response.json())
      .then(data => {
        const attendanceTableBody = document.querySelector("#attendance-table tbody");
        data.forEach(member => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${member.name} ${member.familyName}</td>
            <td>
              <input type="checkbox" class="attendance-checkbox" data-id="${member.id}" ${member.attendance ? "checked" : ""}>
            </td>
          `;
          attendanceTableBody.appendChild(row);
        });
  
        // Attach event listeners to attendance checkboxes
        const attendanceCheckboxes = document.querySelectorAll(".attendance-checkbox");
        attendanceCheckboxes.forEach(checkbox => {
          checkbox.addEventListener("change", updateAttendance);
        });
      });
  
    // Login form submission handler
    document.getElementById("login-form").addEventListener("submit", function(event) {
      event.preventDefault();
  
      // Get the entered username and password
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      // Perform login authentication
      if (username === "trainer" && password === "password") {
        alert("Login successful!");
        // Implement redirection or other actions here
      } else {
        alert("Invalid username or password. Please try again.");
      }
    });
  
    // Update attendance status on checkbox change
    function updateAttendance(event) {
      const memberId = event.target.getAttribute("data-id");
      const isChecked = event.target.checked;
  
      // Update the attendance status in the JSON file or make an API call here
      console.log(`Member ID: ${memberId}, Attendance: ${isChecked}`);
      // ...
    }
  });
  