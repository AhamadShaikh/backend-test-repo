const express = require("express")
const middleware = require("../middleware/auth")
const Blogs = require("../model/blogModel")
const router = express.Router()


router.post("/blogs", middleware, async (req, res) => {
    const { username, title, content, category, date } = req.body
    try {
        // console.log(req.body);

        const newBlog = new Blogs({ username, title, content, category, date, creator: req.userId })

        // await newBlog.save()

        res.status("200").json({ msg: "Data Posted", Blog: newBlog })

    } catch (error) {
        res.status("400").json({ msg: "Data not Posted" })
    }
})

router.get("/blogs", middleware, async (req, res) => {
    try {

        const blogs = await Blogs.find({ creator: req.params._id })

        res.status("200").json({ msg: "Blogs Data", Blogs: blogs })

    } catch (error) {
        res.status("400").json({ msg: "Data not found" })
    }
})

router.get("/blogs", middleware, async (req, res) => {
    const { title } = req.query
    try {

        const blogs = await Blogs.find({ creator: req.params._id, title: { $regex: title, $options: "i" } })

        res.status("200").json({ msg: "Blogs Data", Blogs: blogs })

    } catch (error) {
        res.status("400").json({ msg: "Data not found" })
    }
})

router.get("/blogs", middleware, async (req, res) => {
    const { category } = req.query
    try {

        const blogs = await Blogs.find({ creator: req.params._id, category })

        res.status("200").json({ msg: "Blogs Data", Blogs: blogs })

    } catch (error) {
        res.status("400").json({ msg: "Data not found" })
    }
})

router.get("/blogs", middleware, async (req, res) => {
    const { sort, order } = req.query
    try {

        const sortOrder = order === "asc" ? 1 : -1

        const blogs = await Blogs.find({ creator: req.params._id }).sort({ date: sortOrder })

        res.status("200").json({ msg: "Blogs Data", Blogs: blogs })

    } catch (error) {
        res.status("400").json({ msg: "Data not found" })
    }
})

router.patch("/blogs/:id", middleware, async (req, res) => {
    const { id } = req.params
    try {

        const blog = await Blogs.findById(id)

        if (!blog) {
            return res.status("400").json({ msg: "Blogs not found" })
        }

        const updateBlog = await Blogs.findByIdAndUpdate(id, { ...req.body }, { new: true })

        res.status("200").json({ msg: "Blogs updated", Blogs: updateBlog })

    } catch (error) {
        res.status("400").json({ msg: "Internal server error" })
    }
})

router.delete("/blogs/:id", middleware, async (req, res) => {
    const { id } = req.params
    try {

        const blog = await Blogs.findById(id)

        if (!blog) {
            return res.status("400").json({ msg: "Blogs not found" })
        }

        const deletedBlog = await Blogs.findByIdAndDelete(id, { new: true })

        res.status("200").json({ msg: "Blogs deleted", Blogs: deletedBlog })

    } catch (error) {
        res.status("400").json({ msg: "Internal server error" })
    }
})

router.patch("/blogs/:id/like", middleware, async (req, res) => {
    const { id } = req.params
    try {

        const blogLike = await Blogs.findById(id)

        if (!blogLike) {
            return res.status("400").json({ msg: "Blogs not found" })
        }

        if (!blogLike.likes.includes(req.userId)) {
            blogLike.likes.push(req.userId)
        }

        res.status("200").json({ msg: "Blogs liked", Blogs: blogLike })

    } catch (error) {
        res.status("400").json({ msg: "Internal server error" })
    }
})

router.patch("/blogs/:id/comment", middleware, async (req, res) => {
    const { id } = req.params
    try {

        const blogComment = await Blogs.findById(id)

        if (!blogComment) {
            return res.status("400").json({ msg: "Blogs not found" })
        }

        const newBlogComment = { username: req.name, content: Comment }

        blogComment.push(newBlogComment)

        res.status("200").json({ msg: "Blogs Commented", Blogs: blogComment })

    } catch (error) {
        res.status("400").json({ msg: "Internal server error" })
    }
})

module.exports = router