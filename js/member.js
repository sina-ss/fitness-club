document.addEventListener("DOMContentLoaded", function() {
    // Fetch courses data from JSON and populate the course selection options
    fetch("./courses.json")
      .then(response => response.json())
      .then(data => {
        const courseSelect = document.getElementById("course-select");
        data.forEach(course => {
          const option = document.createElement("option");
          option.value = course.id;
          option.textContent = `${course.name} (${course.price})`;
          courseSelect.appendChild(option);
        });
      });
  
    // Course selection form submission handler
    document.getElementById("course-selection-form").addEventListener("submit", function(event) {
      event.preventDefault();
      const selectedCourseId = document.getElementById("course-select").value;
  
      // Perform payment processing or update member's wallet in the JSON file or make an API call here
      console.log(`Course selected: ${selectedCourseId}`);
      // ...
    });
  });
  