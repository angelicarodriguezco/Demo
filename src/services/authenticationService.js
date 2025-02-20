const User = require('./models/User');
const bcrypt = require('bcryptjs');

const validateUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Email or password incorrect");
    }

    if (user.loginAttempts >= 3) {
        throw new Error("User blocked, recover password");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        user.loginAttempts += 1;
        await user.save();
        throw new Error("Email or password incorrect");
    }

    user.loginAttempts = 0;
    await user.save();
    return user;
};

const register = async (username, email, password) => {
    try {
        const newEncryptedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username: username,
            email: email,
            password: newEncryptedPassword
        });

        const result = await user.save()
        console.log('User was registered correctly');
        return result;
    } catch (error) {
        console.error('Error registering user', error);
    }
}

module.exports = { validateUser, register };
