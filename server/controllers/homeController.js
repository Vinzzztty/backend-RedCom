const Posts = require("../models/Post")

module.exports = {
    home: async (req, res) => {
        try {
            const post = await Posts.find();
            res.render("home", { post })

        } catch (err) {
            
        }
    }
}