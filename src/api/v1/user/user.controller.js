const Users = require("../user/user.model");
const jwt = require("jsonwebtoken");
const joi = require('joi')
const { CteateValidate } = require('../user/user.validate')

const userServices = require('../user/user.service');

const userController = {

    createUser: async (req, res) => {
        try {
            const { username, email, phone } = req.body;

            const { error, value } = CteateValidate.validate(req.body)
            if (error) {
                return res.json({ meassage: error.message })
            }

            ///check e-mail
            const emailCheck = await userServices.emailCheck(email);
            if (emailCheck) {
                return res.status(400).json({ msg: "This email already exists!!!" });
            }
            /// phone validate
            const phonevalid = await userServices.phonevalid(phone);
            if (!phonevalid) {
                return res
                    .status(400)
                    .json({ msg: "Phone number must be greater than 10 and be number!" });
            }
            /// phone check
            const phoneCheck = await userServices.phoneCheck(phone);
            if (phoneCheck) {
                return res.status(400).json({ msg: "This phone number already exists!!!" });
            }

            const newUser = await userServices.cteateUser(username, email, phone);

            const access_token = createAccessToken({ id: newUser.user._id });
            const refresh_token = createRefreshToken({ id: newUser.user._id });

            res.cookie("refrestoken", refresh_token, {
                httpOnly: true,
                path: "/api/v1/refresh_token",
                maxAge: 30 * 24 * 60 * 60 * 1000,
            });


            //send mail
            await userServices.sendGmail(newUser.randomPassword, email);

            res.json({
                msg: "Register successfully!",
                access_token,
                user: newUser.user
            });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
};
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
    });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = userController;