const signUpButton = document.getElementById("signUpSubmit");
const loginButton = document.getElementById("loginSubmit");

signUpButton.addEventListener("click", async () => {

    const username = document.getElementById("usernameInput").value;

    const password = document.getElementById("passwordInput").value;

    const newUser = {
        username: username,
        password: password,
        reviews: []
    };

    try {

        let response = await api.postUser(newUser);

    }
    catch (error) {

        console.log("Error:", error);

    }

});

loginButton.addEventListener("click", async () => {

    const username =
        document.getElementById("usernameInput").value;

    const password =
        document.getElementById("passwordInput").value;

    try {

        const response = await fetch(
            "http://localhost:8000/users",
            {
                method: "GET",

                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const users = await response.json();

        const foundUser = users.find(user =>
            user.username === username &&
            user.password === password
        );

        if (foundUser) {

            console.log("Login successful");

            console.log(foundUser);

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(foundUser)
            );

        }
        else {

            console.log("Wrong username or password");

        }

    }
    catch (error) {

        console.log("Error:", error);

    }

});