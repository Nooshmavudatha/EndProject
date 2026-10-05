const reportContainer = document.getElementById("reportContainer");

let students = JSON.parse(localStorage.getItem("students")) || [];
let marks = JSON.parse(localStorage.getItem("marks")) || [];
let attendance = JSON.parse(localStorage.getItem("attendance")) || [];

function displayReports() {
    reportContainer.innerHTML = "";

    students.forEach(function(student) {
        const studentMarks = marks.filter(function(record) {
            return record.rollNo == student.rollNo;
        });

        let totalMarks = 0;

        studentMarks.forEach(function(record) {
            totalMarks += Number(record.marks);
        });

        let average = 0;

        if (studentMarks.length > 0) {
            average = totalMarks / studentMarks.length;
        }

        const studentAttendance = attendance.find(function(record) {
            return record.rollNo == student.rollNo;
        });

        let attendancePercentage = 0;
        let remark = "No Attendance";

        if (studentAttendance) {
            attendancePercentage =
                (studentAttendance.attended /
                studentAttendance.total) * 100;

            if (attendancePercentage < 75) {
                remark = "Detained";
            } else if (attendancePercentage <= 85) {
                remark = "Condonated";
            } else {
                remark = "Promoted";
            }
        }

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.rollNo}</td>
            <td>${totalMarks}</td>
            <td>${average.toFixed(2)}%</td>
            <td>${attendancePercentage.toFixed(2)}%</td>
            <td>${remark}</td>
        `;

        reportContainer.appendChild(row);
    });
}

displayReports();
