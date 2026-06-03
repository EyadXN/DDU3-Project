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
                let sparadeReviews = [];

                for(let rev of user.reviews){
                    if(rev.imdb !== review.imdbID){
                        sparadeReviews.push(rev);
                    }
                }

                
                
                if (sparadeReviews.length < innanRadering) {
                    bolean = true;
                }
                user.reviews = sparadeReviews;
            }
        }

        if (bolean) {
            Deno.writeTextFileSync("./database.json", JSON.stringify(data, null, 2));
        }

        return bolean;
    }
}

export let use = new Users();