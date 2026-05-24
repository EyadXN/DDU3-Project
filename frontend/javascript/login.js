function logOut(){
    const logOutBtn = document.getElementById("logOutBtn");

    logOutBtn.addEventListener("click", function(){
        localStorage.removeItem("loggedInUser");
        nav();
        window.location.href = "login.html"
    })
}
function nav(){
        let header = document.querySelector("header");
        const loggedInUser = localStorage.getItem("loggedInUser")
        if(loggedInUser){
            header.innerHTML = `
            <div>
                <div></div>
                <div></div>
                <div></div>
                <p>Revaiew</p>
            </div>
                <nav>
                    <ul>
                        <li><a id="profile" href="profile.html"></a></li>
                        <li><a href="discover.html">DISCOVER</a></li>
                        <button id= "logOutBtn">Log out</button>
                    </ul>
                </nav>
            `;
            logOut();
        }
        else{
            header.innerHTML = `
            <div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <p>Revaiew</p>
                </div>
                <nav>
                    <ul>
                        <li><a href="discover.html">DISCOVER</a></li>
                        <li id="special"><a href="login.html">SIGN IN</a></li>
                    </ul>
                </nav>
            `
        }
    }

nav();




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

        console.log("User created:", data[data.length - 1]);

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
            window.location.href = "../html/discover.html"

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