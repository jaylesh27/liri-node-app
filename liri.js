var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var userCommand1 = process.argv[2];
var userCommand2 = process.argv[3];

//my-tweets: This will show your last 20 tweets and when they were created at in your terminal/bash window.

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

function printTweets (tweets) {
	for (var i = 0; i < tweets.length; i++) {
		if (tweets.length === 21) {
			break;
		}
		console.log(tweets[i].user.name + ' tweeted "' + tweets[i].text + '" at ' + tweets[i].created_at + '.');
		console.log("--------------");
	}
}

client.get("statuses/user_timeline", function(error, tweets) {
	if (error) {
		console.log("Error: " + error);
	}else if (!error && userCommand1 === "my-tweets") {
		printTweets(tweets);
	}
});

//spotify-this-song:
	//example: node liri.js spotify-this-song '<song name here>'
	//This will show the following information about the song in your bash window: artist(s), the song's name, a preview link of the song from Spotify, and the album that the song is from
	//if no song is provided then your program will default to "The Sign" by Ace of Base


var spotify = new Spotify({
  id: "f61401f0e074460fb649873b2b1ccfcd",
  secret: "aeb06333b80e45e6bd6994eaa6e233a8"
});

function printSongInfo(response) {
  	//artist
  	console.log("Artist Name: " + response.tracks.items[0].artists[0].name);
  	//song's name
  	console.log("Song: " + response.tracks.items[0].name);
  	//preview link of the song from spotify
  	console.log("Link: " + response.tracks.items[0].external_urls.spotify);
  	//the song's album
  	console.log("Album: " + response.tracks.items[0].album.name);
}

function spotifyThisSong(userCommand1, userCommand2) {
	spotify.search({ type: 'track', query: userCommand2 || "The Sign Ace of Base", limit: 1 }, function(error, response) {
	  if (error) {
	    console.log('Error: ' + error);
	  }else if (!error && userCommand1 === "spotify-this-song") {
	  	// console.log("spotify call works");
	  	printSongInfo(response);
	  }
	});
}
//movie-this:
	//example: node liri.js movie-this '<movie name here>'
	//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
		//"If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/"
		//"It's on Netflix!"


var queryURL = "http://www.omdbapi.com/?apikey=ac73aa36&t=" + userCommand2;
var defaultQuery = "http://www.omdbapi.com/?apikey=ac73aa36&t=mr+nobody";

function printMovieInfo(body) {
	var movieData = JSON.parse(body);
	// Title of the movie.
	console.log("Title: " + movieData.Title);
	// Year the movie came out.
	console.log("Year this film came out: " + movieData.Year);
	// IMDB Rating of the movie.
	console.log("imdb Rating: " + movieData.imdbRating);
	// Country where the movie was produced.
	console.log("Country where produced: " + movieData.Country);
	// Language of the movie.
	console.log("Language: " + movieData.Language);
	// Plot of the movie.
	console.log("Plot: " + movieData.Plot);
	// Actors in the movie.
	console.log("Actors: " + movieData.Actors);
	// Rotten Tomatoes URL.
	console.log("Website: " + movieData.Website);
}

if (userCommand1 === "movie-this" && userCommand2 === undefined) {
		request(defaultQuery, function(error, data, body) {
			if (error) {
				console.log("Error: " + error);
			}else if (!error) {
				console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/" + "\nIt's on Netflix!");
				printMovieInfo(body);
				logData(data);
			}
		});
	}else request(queryURL, function(error, data, body) {
		if (error) {
			console.log("Error: " + error);
		}else if (!error && userCommand1 === "movie-this") {
			printMovieInfo(body);
			logData(data);
			}
		});



//do-what-it-says: Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
	//Feel free to change the text in that document to test out the feature for other commands.


function doWhatItSays() {
	if (userCommand1 === "do-what-it-says") {
		fs.readFile("random.txt", "utf8", function(error, data) {
		  if (error) {
		    return console.log("Error: " + error);
		  }else if (!error) {
		  	//console.log(data);
		  	var dataArr = data.split(",");
		  	//console.log(dataArr);
		  	userCommand1 = dataArr[0];
		  	userCommand2 = dataArr[1];
		  	spotifyThisSong(userCommand1, userCommand2);
		  	logData();
		  }
		});
	}
}

//bonus
	//In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
	//Make sure you append each command you run to the log.txt file.
	//Do not overwrite your file each time you run a command.

function logData() {
	fs.appendFile("./log.txt", "\nIt works\n", function(error) {
	  if (error) {
	    console.log("Error: " + error);
	  }
	  else {
	    console.log("Data added to log!");
	  }
	});
}

spotifyThisSong(userCommand1, userCommand2);
doWhatItSays();