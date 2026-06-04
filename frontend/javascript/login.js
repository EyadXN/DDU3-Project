function logOut(){
    const logOutBtn = document.getElementById("logOutBtn");

    logOutBtn.addEventListener("click", async function(){
        try{
            await api.logOutUser();
            nav();
            window.location.href = "login.html"
        }catch(error){
            console.log("logout Failed" + error)
        }
        
    })
}
function nav(){
        let header = document.querySelector("header");
        const loggedInUser = document.cookie.includes("user_id=");
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

signUpButton.addEventListener("click", async function() {

    const username = document.getElementById("signUpUsernameInput").value;
    const password = document.getElementById("signUpPasswordInput").value;
    const passwordConfirm = document.getElementById("signUpPasswordInputconfirm").value;

    const newUser = {
        name: username,
        password: password,
        id: 0,
        reviews: []
    };

    if (passwordConfirm === password) {
        try {
            const data = await api.postUser(newUser);
            console.log("User created:", data[data.length - 1]);
        }
        catch (error) {
            console.log("Error:", error);   

        } 
    } else {
        console.log("Passwords do not match!");
        alert("Please input same password!");
    }
});

loginButton.addEventListener("click", async function() {
    const username = document.getElementById("loginUsernameInput").value;
    const password = document.getElementById("loginPasswordInput").value;

    const credentials = {
        name: username,
        password: password
    };

    try {
        const responseOk = await api.loginUser(credentials);
        if(responseOk){
            alert("logged in succesfully")
            window.location.href = "../html/discover.html";
        }else{
            alert("Couldn't find user");
        }

    }
    catch (error) {
        console.log("Request failed, network error:", error);
    }

});