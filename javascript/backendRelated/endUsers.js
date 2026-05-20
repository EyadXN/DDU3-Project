class Users {

    postUser(req, users){
        let data = Deno.readTextFileSync("./database.json");
        data = JSON.parse(data);
        let newUsers = users;
        newUsers.push(req)
        data.userList = newUsers;
        Deno.writeTextFileSync("./database.json", JSON.stringify(data,null, 2));
    }
}

export let use = new Users();