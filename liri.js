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
  case "twitter":
    twitter();
    break;

  case "spotify":
    spotify();
    break;

  case "omdb":
    ombd();
    break;

  case "lotto":
    lotto();
    break;
}

/* 8. Make it so liri.js can take in one of the following commands:

   * `my-tweets`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`


   --------------------------detailed homework directions------------------------------------------------
### What Each Command Should Do

1. `node liri.js my-tweets`

   * This will show your last 20 tweets and when they were created at in your terminal/bash window.
*/
function twitter() {

};
/*
2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
   */

   //below is the basic working function that we used in our previous project
  

  function spotify() { 

    var searchURL = "https://api.spotify.com/v1/search?q=" + value + "&type=playlist&limit=6";

    // console.log(searchURL);

    var spotSearch = {
    "async": true,
    "crossDomain": true,
    "url": searchURL,
    "method": "GET",
    "headers": {
      "authorization": authToken,
      }
    }
    $.ajax(spotSearch).done(function (response) {
    
      // console.log(response);

      var musicSearchResults = response.playlists.items;

     
      };
 
  }; 

  /*

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
     * It's on Netflix!*/

     function omdb(){ 
     // We then run the request module on a URL with a JSON
request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  // If there were no errors and the response code was 200 (i.e. the request was successful)...
  if (!error && response.statusCode === 200) {

    // Then we print out the imdbRating
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    /*check the data and then drill into it to display all of the movie details 
    display all of the movie data using console logs*/
  }
 });
};
/*
   

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.

   */

   function do(){


   };