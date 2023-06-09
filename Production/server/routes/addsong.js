const express= require("express");
const Route = express.Router();
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
let { uploadMusicToS3,UploadPicturesToS3} = require('../middlewares/AMAZONS3');
let {ADD_MUSIC_TO_MONGO,UPDATE_PREV_MUSICS_THUMBNAIL_HASH_IN_MONGO} = require("../database/controller/music/music");

const  { exec } = require( "child_process");
const {promisify} = require("util")
// const executeCommand = promisify(exec);//Might need in future to fix shell scripts

Route.get('/tunescape.com/creatorspace', (req, res) => {
  res.render('addPage.ejs');
  })

let cacheSongName = []

Route.post('/addsong', upload.single('song')/*Multer Middleware*/, async (req, res) => {
    const file = req.file
    const songname = req.body.song_name
    const artist = req.body.song_artist_name
    console.log(songname)
    console.log(file)
    const result = await uploadMusicToS3(file)
    cacheSongName.push(songname)
    await ADD_MUSIC_TO_MONGO(songname,artist,result.Key)
    res.redirect("/add/thumbnail");
  })

Route.get("/add/thumbnail",(req,res)=>{
    res.render("addThumbnail.ejs")
})
Route.post("/add/thumbnail",upload.single("song_thumbnail"),async (req,res)=>{
const result = await UploadPicturesToS3(req.file);
console.log(result.Key)
await UPDATE_PREV_MUSICS_THUMBNAIL_HASH_IN_MONGO(cacheSongName.pop(),result.Key);


//NEED FIX HERE:

//  const shellScriptPath = path.join(__dirname, '..','shell-scripts', 'clean-uploads-dir.sh');
//  console.log(shellScriptPath)
//  await executeCommand(`sh ${shellScriptPath}`)


//************************** */


  res.redirect('/confirmation/song-uploaded');
})
  
Route.get('/confirmation/song-uploaded', (req, res) => {
    res.render('confirmation.ejs')
  })
  
module.exports = Route