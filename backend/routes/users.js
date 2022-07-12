const router = require("express").Router();
let User = require("../models/user.model");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// SET STORAGE
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({ storage: storage })

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(upload.single('myImage'), (req, res) => {
    const username = req.body.username;
    const obj = {
        img: {
            data: fs.readFileSync(path.join(__dirname + "../../uploads/" + req.file.filename)),
            contentType: "image/jpeg"
        }
    }
    const newUser = new User({
        username: username,
        img_pic: obj.img
    });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;