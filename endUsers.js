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
        let userList = data.userList;
        req.id = userList.length;
        userList.push(req)
        Deno.writeTextFileSync("./database.json", JSON.stringify(data, null, 2));
        return userList;
    }
    deleteReview(id, review) {
        let data = Deno.readTextFileSync("database.json");
        data = JSON.parse(data);
        let wasDeleted = false;

        const targetUserId = Number(id);

        for (let user of data.userList) {
            if (Number(user.id) === targetUserId) {
                const reviewCountBefore = user.reviews.length;
                let remainingReviews = [];

                for (let rev of user.reviews) {
                    if (rev.imdb !== review.imdbID) {
                        remainingReviews.push(rev);
                    }
                }



                if (remainingReviews.length < reviewCountBefore) {
                    wasDeleted = true;
                }
                user.reviews = remainingReviews;
            }
        }

        if (wasDeleted) {
            Deno.writeTextFileSync("./database.json", JSON.stringify(data, null, 2));
        }

        return wasDeleted;
    }

    findUser(id, userList) {
        for (let user of userList) {
            if (Number(user.id) === Number(id)) {
                return user;
            }
        }
        return null;
    }
}

export let use = new Users();