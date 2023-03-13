const jwt = require('jsonwebtoken');
const { findUsername, insertUser, findById } = require('../database/user.js');
const crypto = require('crypto');

const login = async (username, password) => {
    const user = await findUsername(username);
    // Step1: check if user is existed or not
    if (!user) {
        throw new Error("Người dùng không tồn tại!");
    }
    // Step2: check password correct or not
    if (!verifyPassword(password, user)) {
        throw new Error("Sai mật khẩu!")
    }

    const token = jwt.sign(
        { userId: user._id },
        "My_Private_Key",
        { expiresIn: "3600s" }
    );
    console.log(token);
    return ({
        username: username,
        token: token
    });
}

const signup = async (username, email, password) => {
    const user = await findUsername(username);
    if (user) {
        throw new Error("Người dùng này đã tồn tại!");
    }
    const { salt, hashedPassword } = encryptPassword(password);
    const addNewUser = await insertUser({
        username: username,
        email: email,
        salt: salt,
        hashedPassword: hashedPassword
    })
    return (addNewUser);
}

const encryptPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return ({
        salt: salt,
        hashedPassword: hashedPassword
    });
};

const verifyPassword = (password, user) => {
    const hashedPW = crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'sha512').toString('hex');
    return hashedPW == user.hashedPassword;
}

const verifyToken = async (token) => {
    if (!token) {
        throw new Error("Missing token!");
    }
    try {
        const result = jwt.verify(token, "My_Private_Key");
        const user = await findById(result.userId);
        // console.log(user);
        function checkAdmin() {
            if (!user.isAdmin) {
                return false
            } else return user.isAdmin
        }
        return ({
            username: user.username,
            email: user.email,
            isAdmin: checkAdmin()
        })
    } catch (err) {
        throw new Error("Invalid token!");
    }
};

module.exports = { login, signup, verifyToken };