const {UploadPicturesToS3}  = require('./AMAZONS3')

async function userCreator(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const age = req.body.age;
    const file = req.file
    const result = await UploadPicturesToS3(file);
    hash_user_pic = result.key;
    console.log(result);
    createUser(username, age, password, email, result.Key)
    next()
}

module.exports = userCreator;