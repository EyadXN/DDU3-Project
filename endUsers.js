class Users {
    createUserControl(req){
        if(req.name && req.password){        
           return true
        }
        return false;
    }
    postUser(req){
        let data = Deno.readTextFileSync("database.json");
        data = JSON.parse(data);
        let newUsers = data.userList;
        newUsers.push(req)
        Deno.writeTextFileSync("./database.json", JSON.stringify(data,null, 2));
        return  newUsers;
    }
}

export let use = new Users();