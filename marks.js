const marksForm =
    document.getElementById("marksForm");

const markStudent =
    document.getElementById("markStudent");

const marksTable =
    document.getElementById("marksTable");


let students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


let marks =
    JSON.parse(
        localStorage.getItem("marks")
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

    markStudent.appendChild(option);

});


/* Display marks */

function displayMarks() {

    marksTable.innerHTML = "";


    marks.forEach(function(record) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${record.student}</td>

            <td>${record.subject}</td>

            <td>${record.marks}</td>

        `;


        marksTable.appendChild(row);

    });

}


/* Save marks */

marksForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const selectedIndex =
            markStudent.value;


        const student =
            students[selectedIndex];


        const subject =
            document
            .getElementById("subject")
            .value.trim();


        const markValue =
            document
            .getElementById("marks")
            .value;


        if (!student) {

            alert("Please select a student.");

            return;
        }


        marks.push({

            student:
                student.name,

            rollNo:
                student.rollNo,

            subject:
                subject,

            marks:
                Number(markValue)

        });


        localStorage.setItem(
            "marks",
            JSON.stringify(marks)
        );


        marksForm.reset();

        displayMarks();

        alert("Marks saved successfully!");

    }
);


displayMarks();