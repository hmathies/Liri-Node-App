
var twitterKeys = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
}


var spotifyKeys = {
    client_id: process.env.SPOTIFY_ID,
    client_secret: process.env.SPOTIFY_SECRET
}

var omdbKey = {
    apiKey: process.env.OMBD_KEY
}


module.exports = {
    twitterKeys,
    spotifyKeys,
    omdbKey
}

