const currentUser =
    getLoggedInUser();


if (!currentUser) {

    window.location.href =
        "login.html";

}


/* User dashboard */

const userName =
    document.getElementById("userName");

const welcomeName =
    document.getElementById("welcomeName");


if (userName) {

    userName.textContent =
        currentUser.name;

}


if (welcomeName) {

    welcomeName.textContent =
        currentUser.name;

}


/* Profile */

const profileName =
    document.getElementById("profileName");

const profileUsername =
    document.getElementById("profileUsername");

const profileEmail =
    document.getElementById("profileEmail");


if (profileName) {

    profileName.textContent =
        currentUser.name;

}


if (profileUsername) {

    profileUsername.textContent =
        currentUser.username;

}


if (profileEmail) {

    profileEmail.textContent =
        currentUser.email;

}


/* User marks */

const userMarksTable =
    document.getElementById("userMarksTable");


const marks =
    JSON.parse(
        localStorage.getItem("marks")
    ) || [];


if (userMarksTable) {

    const myMarks =
        marks.filter(
            record =>
                record.student
                .toLowerCase() ===
                currentUser.name.toLowerCase()
        );


    myMarks.forEach(function(record) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${record.subject}</td>

            <td>${record.marks}</td>

        `;


        userMarksTable.appendChild(row);

    });

}


/* User attendance */

const userAttendanceTable =
    document.getElementById(
        "userAttendanceTable"
    );


const attendance =
    JSON.parse(
        localStorage.getItem("attendance")
    ) || [];


if (userAttendanceTable) {

    const myAttendance =
        attendance.filter(
            record =>
                record.student
                .toLowerCase() ===
                currentUser.name.toLowerCase()
        );


    myAttendance.forEach(function(record) {

        const percentage =
            (
                record.attended /
                record.total
            ) * 100;


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>${record.total}</td>

            <td>${record.attended}</td>

            <td>${percentage.toFixed(2)}%</td>

        `;


        userAttendanceTable.appendChild(row);

    });

}


/* User report */

const reportName =
    document.getElementById("reportName");

const reportUsername =
    document.getElementById("reportUsername");

const reportTotal =
    document.getElementById("reportTotal");

const reportPercentage =
    document.getElementById(
        "reportPercentage"
    );

const reportGrade =
    document.getElementById("reportGrade");

const reportResult =
    document.getElementById("reportResult");


if (reportName) {

    reportName.textContent =
        currentUser.name +
        " - Academic Report";


    reportUsername.textContent =
        currentUser.username;


    const myMarks =
        marks.filter(
            record =>
                record.student
                .toLowerCase() ===
                currentUser.name.toLowerCase()
        );


    let total = 0;


    myMarks.forEach(function(record) {

        total += Number(record.marks);

    });


    let percentage = 0;


    if (myMarks.length > 0) {

        percentage =
            total /
            (myMarks.length * 100) *
            100;

    }


    let grade;


    if (percentage >= 90) {

        grade = "A+";

    } else if (percentage >= 80) {

        grade = "A";

    } else if (percentage >= 70) {

        grade = "B";

    } else if (percentage >= 60) {

        grade = "C";

    } else if (percentage >= 50) {

        grade = "D";

    } else {

        grade = "F";

    }


    reportTotal.textContent =
        total;


    reportPercentage.textContent =
        percentage.toFixed(2) + "%";


    reportGrade.textContent =
        grade;


    reportResult.textContent =
        percentage >= 40
            ? "PASS"
            : "FAIL";

}