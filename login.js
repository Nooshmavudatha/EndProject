const loginForm =
    document.getElementById("loginForm");


const showPassword =
    document.getElementById("showPassword");


const password =
    document.getElementById("password");


const loginMessage =
    document.getElementById("loginMessage");


/* Demo admin account */

let users =
    JSON.parse(localStorage.getItem("users")) || [];


const adminExists =
    users.some(user => user.username === "admin");


if (!adminExists) {

    users.push({

        name: "Administrator",

        username: "admin",

        email: "admin@srms.com",

        password: "admin123",

        role: "admin"

    });


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}


/* Show / Hide Password */

showPassword.addEventListener("click", function() {

    if (password.type === "password") {

        password.type = "text";

        showPassword.textContent = "Hide";

    } else {

        password.type = "password";

        showPassword.textContent = "Show";
    }

});


/* Login */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const username =
        document
        .getElementById("username")
        .value.trim();


    const passwordValue =
        password.value;


    if (username === "" || passwordValue === "") {

        loginMessage.textContent =
            "Please enter username and password.";

        loginMessage.style.color = "#dc2626";

        return;
    }


    users =
        JSON.parse(
            localStorage.getItem("users")
        ) || [];


    const user =
        users.find(
            item =>
                item.username === username &&
                item.password === passwordValue
        );


    if (!user) {

        loginMessage.textContent =
            "Invalid username or password.";

        loginMessage.style.color = "#dc2626";

        return;
    }


    localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
    );


    loginMessage.textContent =
        "Login successful!";

    loginMessage.style.color = "#16a34a";


    setTimeout(function() {

        if (user.role === "admin") {

            window.location.href =
                "admin.html";

        } else {

            window.location.href =
                "user.html";
        }

    }, 500);

});