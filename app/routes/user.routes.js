// module.exports = app => {
const User = require("../controllers/user.controller.js");
const authorize = require('../middleware/authorize')
const multer = require("multer")

const upload = multer({
    dest: './uploads'
})

var router = require("express").Router();


router.post('/auth', User.authenticateSchema, User.authenticate);
router.post('/register', User.registerSchema, User.register);
router.get('/', authorize(), User.getAll);
router.get('/current', authorize(), User.getCurrent);
router.get('/:id', authorize(), User.getById);
router.put('/:id', authorize(), User.updateSchema, upload.single('file'), User.updateUser);
router.delete('/:id', authorize(), User._delete);

router.post('/', upload.single('file'), User.create);
router.get('/image', User.getImage)

module.exports = router;