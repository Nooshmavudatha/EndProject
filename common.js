function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";
}


function getLoggedInUser() {

    const user = localStorage.getItem("loggedInUser");

    if (!user) {
        return null;
    }

    return JSON.parse(user);
}


function requireLogin() {

    const user = getLoggedInUser();

    if (!user) {
        window.location.href = "login.html";
    }

    return user;
}