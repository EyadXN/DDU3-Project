const signUpButton = document.getElementById("signUpSubmit");
const loginButton = document.getElementById("loginSubmit");

signUpButton.addEventListener("click", async () => {

    const username = document.getElementById("usernameInput").value;

    const password = document.getElementById("passwordInput").value;

    const newUser = {
        name: username,
        password: password,
        id: 0,
        reviews: []
    };

    try {

        const data = await api.postUser(newUser);

        console.log("User created:", data);

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
            "/users",
            {
                method: "GET",

                headers: {
                    "Accept": "application/json"
                }
            }
        );

        const users = await response.json();

        let foundUser = false;
        let user;
        for(user of users){
            if(user.name === username && user.password === password){
                foundUser = true;
                break
            } 
        }

        if (foundUser) {

            console.log("Login successful");

            console.log(foundUser);

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(user)
            );
            window.location.href = "discover.html"

        }
        else {

            console.log("Wrong username or password");
            alert("Couldn't find user")

        }

    }
    catch (error) {

        console.log("Request failed, netword error:", error);

    }

});