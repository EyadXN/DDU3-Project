class Users {
    userControl(req) {
        if (req.name && req.password) {
            let data = Deno.readTextFileSync("database.json");
            data = JSON.parse(data);
            let users = data.userList;
            for (let user of users) {
                if (req.name == user.name && req.password == user.password) {
                    throw new Error("användaren finns redan");
                }
                return true;
            }
        }
        return false;
    }
    postUser(req) {
        let data = Deno.readTextFileSync("database.json");
        data = JSON.parse(data);
        let newUser = data.userList;
        req.id = newUser.length;
        newUser.push(req)
        Deno.writeTextFileSync("./database.json", JSON.stringify(data, null, 2));
        return newUser;
    }
    deleteReview(id, review) {
        let data = Deno.readTextFileSync("database.json");
        data = JSON.parse(data);
        let bolean = false;

        const targetUserId = Number(id);

        for (let user of data.userList) {
            if (Number(user.id) === targetUserId) {
                const innanRadering = user.reviews.length;


                user.reviews = user.reviews.filter(rev => rev.imdbID !== review.imdbID);

                
                
                if (user.reviews.length < innanRadering) {
                    bolean = true;
                }
            }
        }

        if (bolean) {
            Deno.writeTextFileSync("./database.json", JSON.stringify(data, null, 2));
        }

        return bolean;
    }

    deleteUser(id, userList) {
        let targetId = Number(id);

        let hittad = false;

        
        for (let user of userList) {
           
            if (Number(user.id) === targetId) {
                hittad = true; 
                break;         
            }
        }

        if (hittad === false) {
            return null;
        }

       
        let data = JSON.parse(Deno.readTextFileSync("database.json"));

       
        data.userList = data.userList.filter(user => Number(user.id) !== targetId);

        
        Deno.writeTextFileSync("./database.json", JSON.stringify(data, null, 2));

        return data.userList;
    }
}

export let use = new Users();