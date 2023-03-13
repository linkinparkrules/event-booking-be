const {db} = require('./');
const {ObjectId} = require('mongodb');

const findUsername = async (username) => {
    const user = await db.user.findOne({username: username});
    return user;
}

const insertUser = async (user) => {
    await db.user.insertOne(user);
    return user;
}

const findById = async(id) => {
    const user = await db.user.findOne({_id: ObjectId(id)});
    return user;
}

module.exports = {findUsername, insertUser, findById};