const attendanceForm = document.getElementById("attendanceForm");
const attendanceStudent = document.getElementById("attendanceStudent");
const attendanceTable = document.getElementById("attendanceTable");

let students = JSON.parse(localStorage.getItem("students")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

students.forEach(function (student, index) {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = student.name + " - " + student.rollNo;
    attendanceStudent.appendChild(option);
});

function displayAttendance() {
    attendanceTable.innerHTML = "";

    attendance.forEach(function (record, index) {
        const row = document.createElement("tr");
        const percentage = (record.attended / record.total) * 100;

        let remark;

        if (percentage < 75) {
            remark = "Detained";
        } else if (percentage <= 85) {
            remark = "Condonated";
        } else {
            remark = "Promoted";
        }

        row.innerHTML = `
            <td>${record.student}</td>
            <td>${record.total}</td>
            <td>${record.attended}</td>
            <td>${percentage.toFixed(2)}%</td>
            <td>${remark}</td>
            <td>
                <button type="button" class="delete-btn" onclick="deleteAttendance(${index})">
                    Delete
                </button>
            </td>
        `;

        attendanceTable.appendChild(row);
    });
}

attendanceForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const selectedIndex = attendanceStudent.value;
    const student = students[selectedIndex];

    const total = Number(
        document.getElementById("totalClasses").value
    );

    const attended = Number(
        document.getElementById("attendedClasses").value
    );

    if (!student) {
        alert("Please select a student.");
        return;
    }

    if (total <= 0) {
        alert("Total classes must be greater than 0.");
        return;
    }

    if (attended < 0) {
        alert("Attended classes cannot be negative.");
        return;
    }

    if (attended > total) {
        alert("Attended classes cannot be greater than total classes.");
        return;
    }

    attendance.push({
        student: student.name,
        rollNo: student.rollNo,
        total: total,
        attended: attended
    });

    localStorage.setItem("attendance", JSON.stringify(attendance));

    attendanceForm.reset();
    displayAttendance();

    alert("Attendance saved successfully!");
});

function deleteAttendance(index) {
    const confirmDelete = confirm(
        "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) {
        return;
    }

    attendance.splice(index, 1);

    localStorage.setItem("attendance", JSON.stringify(attendance));

    displayAttendance();

    alert("Attendance deleted successfully!");
}

displayAttendance();
