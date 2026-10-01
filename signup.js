const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const username =
        document.getElementById("username").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const message =
        document.getElementById("signupMessage");


    if (
        name === "" ||
        username === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
    ) {

        message.textContent =
            "Please fill all fields.";

        message.style.color = "#dc2626";

        return;
    }


    if (password.length < 6) {

        message.textContent =
            "Password must contain at least 6 characters.";

        message.style.color = "#dc2626";

        return;
    }


    if (password !== confirmPassword) {

        message.textContent =
            "Passwords do not match.";

        message.style.color = "#dc2626";

        return;
    }


    let users =
        JSON.parse(localStorage.getItem("users")) || [];


    const existingUser =
        users.find(user =>
            user.username.toLowerCase() ===
            username.toLowerCase()
        );


    if (existingUser) {

        message.textContent =
            "Username already exists.";

        message.style.color = "#dc2626";

        return;
    }


    const newUser = {

        name: name,

        username: username,

        email: email,

        password: password,

        role: "user"

    };


    users.push(newUser);


    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );


    message.textContent =
        "Account created successfully!";

    message.style.color = "#16a34a";


    signupForm.reset();


    setTimeout(function() {

        window.location.href = "login.html";

    }, 1200);

});