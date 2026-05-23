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
        let main = document.querySelector("main");
        let welcomeTitle = document.querySelector("welcomeMessage");
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
            welcomeTitle.innerHTML = `
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
            `;
            main.innerHTML = `<p style="font-size:82px; text-align: center;">Please Log in!</p>`; 
        }
}
nav();