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

/*add switch statements that run the liri bot*/
route();

function route() {
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


//------------------------------------------------------------Twitter---------------------------------------------------------------------


//function so that Liri can take in the 'my-tweets' command
function getMyTweets() {

    var client = new Twitter(keys.twitterKeys);

    var params = {
        screen_name: 'DevRoddy'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (error) {
            console.log(error);
        } else {
            for (i in tweets) {

                console.log(tweets[i].text);
            }

        }

    });

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


function spotifyThisSong(value) {

    var action = process.argv[2];
    var value = process.argv[3];

    var spotify = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret,
    });

    if (value === undefined) {
        value = "the-sign";
    }


    spotify.search({
        type: 'track',
        query: value,
        limit: 1,
        offset:
    }, function(err, data){
        // console.log('I got ' + data.tracks.total + ' results!');

      if (!err) {
         
            var track = data.tracks.items[0];
            // console.log(track);
             console.log('\nSong Name: ' + value);
             console.log('\nArtist: ' + track.artists[0].name);
             console.log('\nMusic Link: ' + track.external_urls.spotify);
             console.log('\nAlbum Name: ' + track.album.name);
            // Print some information about the results

            // return console.log(`\nArtists: {track.artists[0].name} \nTrack: {value} \nPreview: {track.external_urls.spotify} \nAlbum: {track.album.name}`)
        }else {
          console.log('Sorry! Song not found. Please, check your spelling or try another song.');

        }
 
    });

  }



/*

----------------------------------------------------------OMDB-----------------------------------------------------------------
 */
//function so that Liri can take in the 'movie-this' command
function movieThis() {

    if (value === undefined) {
        value = 'Mr. Nobody';
    }
    // We then run the request module on a URL with a JSON
    request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=" + keys.omdbKey.apiKey, function(error, data, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && data.statusCode === 200) {
            var movie = JSON.parse(body);

            console.log('The Title of the movie is: ' + movie.Title);
            console.log('The Year the movie came out is: ' + movie.Year);
            console.log("The movie's rating is: " + movie.Rated);

            var rating = 'no rating available';
            for (i in movie.Ratings) {
                if (movie.Ratings[i].Source == 'Rotten Tomatoes') {
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


};

/*
 
-------------------------------------------------do-what-it-says-------------------------------------------------------------------  

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.

   */
//function so that Liri can take in the 'do-what-it-says' command
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(err, contents) {
        var args = contents.split(',');
        action = args[0];
        value = args[1];
        route();
    });

};

//~end of Liri bot code
