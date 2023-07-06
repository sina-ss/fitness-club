// Define the API endpoint
const API_URL = 'http://localhost:3000';

// Fetch the list of members for the trainer and populate the attendance table with the member data
async function fetchTrainerMembers(trainerId) {
    try {
        const response = await fetch(`${API_URL}/users/trainer-members/${trainerId}`);
        const data = await response.json();

        const attendanceTable = document.getElementById('attendance-table').getElementsByTagName('tbody')[0];
        attendanceTable.innerHTML = '';

        data.forEach((member) => {
            const row = attendanceTable.insertRow(-1);
            const usernameCell = row.insertCell(0);
            const nameCell = row.insertCell(1);
            const familyNameCell = row.insertCell(2);
            const shiftCell = row.insertCell(3);
            const attendanceCell = row.insertCell(4);

            usernameCell.innerHTML = member.member.username;
            nameCell.innerHTML = member.member.name;
            familyNameCell.innerHTML = member.member.familyName;
            shiftCell.innerHTML = member.member.shift;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = member.member.ID;
            attendanceCell.appendChild(checkbox);
        });
    } catch (error) {
        console.error(error);
    }
}

// Update the attendance status of each member in the database when the trainer marks the attendance using the checkboxes
async function updateAttendanceStatus(trainerId, memberId, isChecked) {
    try {
        const response = await fetch(`${API_URL}/attendance/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                trainerId,
                memberId,
                isChecked,
            }),
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// Attach an event listener to the attendance table to update the attendance status when the trainer marks the attendance using the checkboxes
const attendanceTable = document.getElementById('attendance-table');
attendanceTable.addEventListener('change', (event) => {
    const trainerId = 1; // Change this to the ID of the logged-in trainer
    const memberId = event.target.value;
    const isChecked = event.target.checked;

    updateAttendanceStatus(trainerId, memberId, isChecked);
});

// Fetch the list of members for the trainer and populate the attendance table on page load
fetchTrainerMembers(1); // Change this to the ID of the logged-in trainer