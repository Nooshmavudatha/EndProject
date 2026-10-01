const studentForm =
    document.getElementById("studentForm");

const studentTable =
    document.getElementById("studentTable");


let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


function displayStudents() {

    studentTable.innerHTML = "";


    students.forEach(function(student, index) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${student.name}</td>

            <td>${student.rollNo}</td>

            <td>${student.department}</td>

            <td>${student.year}</td>

            <td>
                <button
                    class="delete-btn"
                    onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>

        `;


        studentTable.appendChild(row);

    });

}


studentForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const student = {

            name:
                document
                .getElementById("studentName")
                .value.trim(),

            rollNo:
                document
                .getElementById("rollNo")
                .value.trim(),

            department:
                document
                .getElementById("department")
                .value.trim(),

            year:
                document
                .getElementById("year")
                .value

        };


        students.push(student);


        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        studentForm.reset();

        displayStudents();

        alert("Student added successfully!");

    }
);


function deleteStudent(index) {

    if (
        confirm(
            "Are you sure you want to delete this student?"
        )
    ) {

        students.splice(index, 1);


        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );


        displayStudents();
    }

}


displayStudents();