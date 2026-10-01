const attendanceForm =
    document.getElementById("attendanceForm");

const attendanceStudent =
    document.getElementById("attendanceStudent");

const attendanceTable =
    document.getElementById("attendanceTable");


let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


let attendance =
    JSON.parse(
        localStorage.getItem("attendance")
    ) || [];


/* Load students */

students.forEach(function(student, index) {

    const option =
        document.createElement("option");

    option.value = index;

    option.textContent =
        student.name +
        " - " +
        student.rollNo;

    attendanceStudent.appendChild(option);

});


/* Display attendance */

function displayAttendance() {

    attendanceTable.innerHTML = "";


    attendance.forEach(function(record) {

        const row =
            document.createElement("tr");


        const percentage =
            (
                record.attended /
                record.total
            ) * 100;


        row.innerHTML = `

            <td>${record.student}</td>

            <td>${record.total}</td>

            <td>${record.attended}</td>

            <td>${percentage.toFixed(2)}%</td>

        `;


        attendanceTable.appendChild(row);

    });

}


/* Save attendance */

attendanceForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const selectedIndex =
            attendanceStudent.value;


        const student =
            students[selectedIndex];


        const total =
            Number(
                document
                .getElementById("totalClasses")
                .value
            );


        const attended =
            Number(
                document
                .getElementById("attendedClasses")
                .value
            );


        if (!student) {

            alert("Please select a student.");

            return;
        }


        if (attended > total) {

            alert(
                "Attended classes cannot be greater than total classes."
            );

            return;
        }


        attendance.push({

            student:
                student.name,

            rollNo:
                student.rollNo,

            total:
                total,

            attended:
                attended

        });


        localStorage.setItem(
            "attendance",
            JSON.stringify(attendance)
        );


        attendanceForm.reset();

        displayAttendance();

        alert(
            "Attendance saved successfully!"
        );

    }
);


displayAttendance();