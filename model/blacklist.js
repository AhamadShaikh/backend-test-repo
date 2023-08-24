const { default: mongoose } = require("mongoose");


const blacklistSchema = new mongoose.Schema({
    token: { type: String, required: true },
})

const BlacklistToken = mongoose.model("blacklisttoken", blacklistSchema)

module.exports = BlacklistToken