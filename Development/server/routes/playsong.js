const express = require("express");
const Route = express.Router();
let {SEARCH_MUSIC_THUMBNAIL_IN_MONGO,SEARCH_MUSIC_IN_MONGO} = require("../database/controller/music/music.js")


Route.get('/tunescape.com/stream/:id', (req, res) => {
    console.log(`res.locals.isAuthenticated = ${res.locals.isAuthenticated}`);
    console.log(`id = ${req.params.id}`);
    if(req.params.id){
        res.render('song-fetch.ejs')
    }
    else{
    res.redirect('/tunescape.com/auth')
    }
})

let cacheHashMusicLink = []
let cacheHashMusicThumbnail = []

Route.post('/getsong', async (req, res) => {
    const GetSongName = req.body.songGETname
    console.log(GetSongName);
    SEARCH_MUSIC_IN_MONGO(GetSongName).then((hash)=>{
       cacheHashMusicLink.push(hash)
    })
    SEARCH_MUSIC_THUMBNAIL_IN_MONGO(GetSongName).then((hash)=>{
        cacheHashMusicThumbnail.push(hash)
    })

    res.redirect('/tunescape.com/stream/song');
})



Route.get('/tunescape.com/stream/song', async (req, res) => {
    res.render("player.ejs", { hash_key: cacheHashMusicLink.pop() ,hash_img: cacheHashMusicThumbnail.pop()})
})

module.exports = Route