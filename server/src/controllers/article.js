const { Articles }  = require('../models');
require('dotenv').config();

/**
 * @description To upload articles of authenticated user
 * @api /upload-file
 * @access Private 
 * @type POST
 */

 exports.uploadFile = async (req, res) => {
    const details = JSON.parse(req.body.details);
    const {id} = req.user;
    const filePath = req.files.filePath.data.toString('base64')
    const article = {
        ...details,
        filePath,
        userId : id
    }
    await Articles.create(article)
    .then(data=>{
        console.log("Hello Article")
        return res.status(201).json({
            message: "Uccessfully upload articles!",
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            message: "Something went wrong!",
        });
    });     
}

//To get for articles' owner
exports.getAllArticles = async(req, res) => {
    const {id} = req.user
    const articles = await Articles.findAll({
        where : {
            userId : id
        },
    });
    res.status(200).json(articles);
}

// To delete artilces's owner
exports.deleteArticles = async(req, res) => {
    const {id} = req.user
    const articles = await Articles.destroy({
        where: {
            userId : id
        },
    })
    res.status(200).json(articles)
}
