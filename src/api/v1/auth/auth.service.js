const User = require('../user/user.model');

const findUser = async (email) => {
    return await User.findOne({ email })

}


module.exports = {
    findUser
}
