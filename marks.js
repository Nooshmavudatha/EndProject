const marksForm = document.getElementById("marksForm");
const markStudent = document.getElementById("markStudent");
const marksTable = document.getElementById("marksTable");

let students = JSON.parse(localStorage.getItem("students")) || [];
let marks = JSON.parse(localStorage.getItem("marks")) || [];

students.forEach(function(student, index) {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = student.name + " - " + student.rollNo;
    markStudent.appendChild(option);
});

function displayMarks() {
    marksTable.innerHTML = "";

    marks.forEach(function(record, index) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${record.student}</td>
            <td>${record.subject}</td>
            <td>${record.marks}</td>
            <td>
                <button type="button" class="delete-btn" onclick="deleteMark(${index})">
                    Delete
                </button>
            </td>
        `;

        marksTable.appendChild(row);
    });
}

marksForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const selectedIndex = markStudent.value;
    const student = students[selectedIndex];

    const subject = document.getElementById("subject").value.trim();
    const markValue = document.getElementById("marks").value;

    if (!student) {
        alert("Please select a student.");
        return;
    }

    if (!subject) {
        alert("Please enter the subject.");
        return;
    }

    if (markValue === "") {
        alert("Please enter marks.");
        return;
    }

    const markNumber = Number(markValue);

    if (markNumber < 0 || markNumber > 100) {
        alert("Marks must be between 0 and 100.");
        return;
    }

    marks.push({
        student: student.name,
        rollNo: student.rollNo,
        subject: subject,
        marks: markNumber
    });

    localStorage.setItem("marks", JSON.stringify(marks));

    marksForm.reset();
    displayMarks();

    alert("Marks saved successfully!");
});

function deleteMark(index) {
    if (confirm("Are you sure you want to delete this mark?")) {
        marks.splice(index, 1);

        localStorage.setItem("marks", JSON.stringify(marks));

        displayMarks();

        alert("Mark deleted successfully!");
    }
}

displayMarks();
