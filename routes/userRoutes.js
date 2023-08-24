const express = require("express")
const { default: mongoose } = require("mongoose")
const User = require("../model/userModel")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const BlacklistToken = require("../model/blacklist")


router.post("/register", async (req, res) => {
    const { email, password } = req.body
    try {

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status("400").json({ msg: "User has been already Registered" })
        }

        const newPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({ ...req.body, password: newPassword })

        res.status("200").json({ msg: "User Successfully Registered", user: newUser })

    } catch (error) {
        res.status("400").json({ msg: "Registration Failed" })
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {

        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status("400").json({ msg: "User Not Found" })
        }

        const verifyPass = await bcrypt.compare(password, existingUser.password)

        if (!verifyPass) {
            return res.status("400").json({ msg: "Invalid Credentials", user: newUser })
        }

        const token = jwt.sign({ userId: existingUser._id, name: existingUser.username }, "ironman", { expiresIn: "2d" })

        const rToken = jwt.sign({ userId: existingUser._id, name: existingUser.username }, "thanos", { expiresIn: "5d" })

        res.status("200").json({ msg: "Login Successfull", token: token, refreshToken: rToken })

    } catch (error) {
        res.status("400").json({ msg: "Login Failed" })
    }
})

router.post("/logout", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    try {

        if (!token) {
            return res.status("400").json({ msg: "Token Not Provided" })
        }

        const isBlacklist = await BlacklistToken.exists({ token })

        if (isBlacklist) {
            return res.status("400").json({ msg: "token has been already invalidated" })
        }

        await BlacklistToken.create({token})

        res.status("200").json({ msg: "Logout Successfull" })

    } catch (error) {
        res.status("400").json({ msg: "Logout Failed" })
    }
})


module.exports = router