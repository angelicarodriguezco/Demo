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

module.exports = { validateUser };
