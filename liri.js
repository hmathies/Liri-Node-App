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
route();
function route(){ 
    switch (action) {
        case "my-tweets":
            getMyTweets();
            break;

        case "spotify-this-song":
            spotifyThisSong();
            break;

        case "movie-this":
            movieThis();
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;

        default: 
            console.log("You're wrong!");
            break;

    }
}

/* 8. Make it so liri.js can take in one of the following commands:

   * `my-tweets`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`


------------------------------------------------------------Twitter---------------------------------------------------------------------

*/

function getMyTweets() {
 
var client = new Twitter(keys.twitterKeys);
 
var params = {screen_name: 'DevRoddy'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error) {
    console.log(error);
  }else{
    for (i in tweets){

       console.log(tweets[i].text);
    }
   
  }

  
 
});
    // Twitter.find(+keys.twitterKeys.consumer_key, function(error, response, body) {
/*
    if (!error && body.statusCode === 200) {
        console.log(JSON.stringify(body, null, 2));
    }
*/
    // });
};

function postMyTweets() {
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
 */

function movieThis() {

if (value === undefined){
  value = 'Mr. Nobody';
}
    // We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=" + keys.omdbKey.apiKey, function(error, data, body) {

    // If there were no errors and the response code was 200 (i.e. the request was successful)...
    if (!error && data.statusCode === 200) {
        var movie = JSON.parse(body);
        /*check the data and then drill into it to display all of the movie details 
        display all of the movie data using console logs*/
        console.log('The Title of the movie is: ' + movie.Title);
        console.log('The Year the movie came out is: ' + movie.Year);
        console.log("The movie's rating is: " + movie.Rated);
        //the rotten tomatoes is the only one not working because i don't know how to code the space
        var rating = 'no rating available';
        for(i in movie.Ratings){
          if(movie.Ratings[i].Source == 'Rotten Tomatoes'){
            rating = movie.Ratings[i].Value;
            break;
          }

        }
        console.log('Rotten Tomatoes Rating of the movie is: ' + rating);
        console.log('The country where the movie was produced is: ' + movie.Country);
        console.log('The Language of the movie is: ' + movie.Language);
        console.log('The Plot of the movie is: ' + movie.Plot);
        console.log('The Actors in the movie are: ' + movie.Actors);
    }
});


}

/*
 
-------------------------------------------------do-what-it-says-------------------------------------------------------------------  

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.

   */

function doWhatItSays() {
  fs.readFile('random.txt', 'utf8', function(err, contents) {
    var args = contents.split(',');
    action = args[0];
    value = args[1];
    route();
  });

};
