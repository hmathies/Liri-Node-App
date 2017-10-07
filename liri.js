/*Heather Mathies October 2017
liri bot code*/
// the code to grab the data from keys.js. Then store the keys in a variable.
var fs = require('fs');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require('./keys.js');

var action = process.argv[2];
var value = process.argv[3];

/*add switch statements and blank functions, then go back to
create the functions
use omdbRequest.js lesson Saturday 21 for OMDB
use thursday bank.js for a lot of help*/
switch (action) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        //??();
        break;
    default: //not sure what to put here

}

/* 8. Make it so liri.js can take in one of the following commands:

   * `my-tweets`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`


------------------------------------------------------------Twitter---------------------------------------------------------------------

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

*/

//Adding my credentials. I'm using environmental variables to keep my private info safe. 
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

/*I'm confused on this...I'm hoping this will give me the tweets back and when they were created
found the code below on npm twitter*/
client.post('statuses/update', {
    status: 'I am a tweet'
}, function(error, tweet, response) {
    if (!error) {
        console.log(tweet);
    }
});

function myTweets() {
    fs.readFile("keys.js", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
    });
    // Twitter.find(+keys.twitterKeys.consumer_key, function(error, response, body) {

    if (!error && body.statusCode === 200) {
        console.log(JSON.stringify(body, null, 2));
    }

    // });
};

/*
-----------------------------------------------------------Spotify---------------------------------------------------------------------

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
   */

//below is the basic working function that we used in our previous project


function spotifyThisSong() {

    var searchURL = "https://api.spotify.com/v1/search?q=" + value + "&type=playlist&limit=6";

    // console.log(searchURL);

    var spotSearch = {
        "async": true,
        "crossDomain": true,
        "url": searchURL,
        "method": "GET",
        "headers": {

        }

    };
};

/*

----------------------------------------------------------OMDB-----------------------------------------------------------------

3. `node liri.js movie-this '<movie name here>'`

   

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
     * It's on Netflix!*/

function movieThis() {
fs.readFile("keys.js", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
    })
    // We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=" + keys.omdbKey.apiKey, function(error, data, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && data.statusCode === 200) {
        console.log(JSON.stringify(data, null, 2));

        /*check the data and then drill into it to display all of the movie details 
        display all of the movie data using console logs*/
        console.log('The Title of the movie is: ' + JSON.parse(body).Title);
        console.log('The Year the movie came out is: ' + JSON.parse(body).Year);
        console.log("The movie's rating is: " + JSON.parse(body).Rated);
        //the rotten tomatoes is the only one not working because i don't know how to code the space
        console.log('Rotten Tomatoes Rating of the movie is: ' + JSON.parse(body).RottenTomatoes);
        console.log('The country where the movie was produced is: ' + JSON.parse(body).Country);
        console.log('The Language of the movie is: ' + JSON.parse(body).Language);
        console.log('The Plot of the movie is: ' + JSON.parse(body).Plot);
        console.log('The Actors in the movie are: ' + JSON.parse(body).Actors);
    }
});

//my attempt at trying to display the Mr. Nobody info if the user leaves the movie title blank
if (value === undefined) {
    value = 'Mr.Nobody';
    request('http://www.omdbapi.com/?t=' + value + '&y=&plot=short&apikey=' + keys.omdbKey.apiKey, function(error, response, body) {




        /*check the data and then drill into it to display all of the movie details 
        display all of the movie data using console logs*/
        console.log('The Title of the movie is: ' + JSON.parse(body).Title);
        console.log('The Year the movie came out is: ' + JSON.parse(body).Year);
        console.log("The movie's rating is: " + JSON.parse(body).Rated);
        //the rotten tomatoes is the only one not working because i don't know how to code the space
        console.log('Rotten Tomatoes Rating of the movie is: ' + JSON.parse(body).RottenTomatoes);
        console.log('The country where the movie was produced is: ' + JSON.parse(body).Country);
        console.log('The Language of the movie is: ' + JSON.parse(body).Language);
        console.log('The Plot of the movie is: ' + JSON.parse(body).Plot);
        console.log('The Actors in the movie are: ' + JSON.parse(body).Actors);
    });
};

};

/*
 
-------------------------------------------------do-what-it-says-------------------------------------------------------------------  

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.

   */

function doWhatItSays() {


};