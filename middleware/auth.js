
const jwt = require("jsonwebtoken")

const middleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    try {

        if (!token) {
            return res.status("400").json({ msg: "Token Not Provided" })
        }

        const decoded = jwt.verify(token, "ironman")

        if (!decoded) {
            return res.status("400").json({ msg: "Invalid Credentials" })
        }

        req.userId = decoded.userId
        req.name = decoded.name

        next()

    } catch (error) {
        console.log(error);
    }
}

module.exports = middleware