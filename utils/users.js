const users = [];

function userJoin(id, username,roomId){
    const user = {id, username, roomId};

    users.push(user);

    return user;
}

//get current user

function getCurrentUser(id) {
    return users.find(user => user.id ===id);
}


module.exports = {
    userJoin,
    getCurrentUser
};