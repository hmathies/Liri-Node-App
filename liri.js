/*Heather Mathies October 2017
liri bot code*/
// the code to grab the data from keys.js which is stored in variables.
require("dotenv").config();
var fs = require("fs");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");

var action = process.argv[2];
var value = process.argv[3];

/* switch statements that run the liri bot*/
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
      console.log(
        "Type <node.liri.js> followed by one of the following: \nmy-tweets\nspotify-this-song <name of song>\nmovie-this\ndo-what-it-says"
      );
      break;
  }
}

/*------------------------------------------------------------Twitter---------------------------------------------------------------------
function so that Liri can take in the 'my-tweets' command*/

function getMyTweets() {
  var client = new Twitter(keys.twitterKeys);

  var params = {
    screen_name: "DevRoddy"
  };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (error) {
      console.log("There was an error ", error);
    } else {
      for (i in tweets) {
        console.log(tweets[i].text);
      }
    }
  });
}

/*-----------------------------------------------------------Spotify---------------------------------------------------------------------
function so that Liri can take in the 'spotify-this-song' command which will show the artist(s), name of song, a link,
 and album name*/

function spotifyThisSong(value) {
  var action = process.argv[2];
  var value = process.argv[3];

  var spotify = new Spotify({
    id: keys.spotifyKeys.client_id,
    secret: keys.spotifyKeys.client_secret
  });

  /* If the user doesn't input a song then the program will default to "The Sign"*/
  if (value == null) {
    value = "The Sign";
  }

  spotify.search(
    {
      type: "track",
      query: value,
      limit: 20
    },

    function(err, data) {
      if (!err) {
        var track = data.tracks.items[0];

        console.log(
          "\nSong Name: " +
            value +
            "\nArtist: " +
            track.artists[0].name +
            "\nMusic Link: " +
            track.external_urls.spotify +
            "\nAlbum Name: " +
            track.album.name
        );
        console.log("\n-------------------------------------------");
      } else {
        console.log(
          "Sorry! Song not found. Please, check your spelling or try another song."
        );
        console.log("\n-------------------------------------------");
      }
    }
  );
}

/*----------------------------------------------------------OMDB-----------------------------------------------------------------
 function so that Liri can take in the 'movie-this' command which will show the movie title, year released, rating, countries filmed,
 languages, plot, and actors */

function movieThis() {
  if (value == null) {
    value = "Mr. Nobody";
  }
  // running the request module on a URL with a JSON
  request(
    "http://www.omdbapi.com/?t=" +
      value +
      "&y=&plot=short&apikey=" +
      keys.omdbKey.apiKey,
    function(error, data, body) {
      // If there were no errors and the response code was 200 (i.e. the request was successful)...
      if (!error && data.statusCode === 200) {
        var movie = JSON.parse(body);

        var rating = "no rating available";
        for (i in movie.Ratings) {
          if (movie.Ratings[i].Source == "Rotten Tomatoes") {
            rating = movie.Ratings[i].Value;
            break;
          }
        }

        console.log("The Title of the movie is: " + movie.Title);
        console.log("The Year the movie came out is: " + movie.Year);
        console.log("The movie's rating is: " + movie.Rated);
        console.log("Rotten Tomatoes Rating of the movie is: " + rating);
        console.log(
          "The country(countries) where the movie was produced is: " +
            movie.Country
        );
        console.log("The Language of the movie is: " + movie.Language);
        console.log("The Plot of the movie is: " + movie.Plot);
        console.log("The Actors in the movie are: " + movie.Actors);
      }
    }
  );
}

/*-------------------------------------------------do-what-it-says-------------------------------------------------------------------
function so that Liri can take in the 'do-what-it-says' command which will do whatever it says in the random.txt file*/
function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(err, contents) {
    var args = contents.split(",");
    action = args[0];
    value = args[1];
    console.log(contents);
    route();
  });
}

//~end of Liri bot code
