const { default: mongoose } = require("mongoose");


const blogsSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],

    // likes: { type: Number, required: true },

    // comments: [{ username: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, content: { type: String, required: true } }],

    comments: [{ username: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, content: String, }],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
})

const Blogs = mongoose.model("blogs", blogsSchema)

module.exports = Blogs