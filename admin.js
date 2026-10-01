const adminUser = requireLogin();

if (adminUser && adminUser.role !== "admin") {
    window.location.href = "user.html";
}


const adminName =
    document.getElementById("adminName");

if (adminName && adminUser) {
    adminName.textContent =
        "Welcome, " + adminUser.name;
}


const students =
    JSON.parse(
        localStorage.getItem("students")
    ) || [];


const marks =
    JSON.parse(
        localStorage.getItem("marks")
    ) || [];


const attendance =
    JSON.parse(
        localStorage.getItem("attendance")
    ) || [];


const totalStudents =
    document.getElementById("totalStudents");

const totalMarks =
    document.getElementById("totalMarks");

const totalAttendance =
    document.getElementById("totalAttendance");


if (totalStudents) {
    totalStudents.textContent =
        students.length;
}


if (totalMarks) {
    totalMarks.textContent =
        marks.length;
}


if (totalAttendance) {
    totalAttendance.textContent =
        attendance.length;
}