var keys = require("./keys.js");

var userCommand = process.argv[2];

//console.log(keys.twitterKeys.consumer_key);


//my-tweets: This will show your last 20 tweets and when they were created at in your terminal/bash window.
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});

//console.log(client);

client.get("statuses/user_timeline", function(error, tweets, response) {
	if (error) {
		console.log("error!");
	}else if (!error && userCommand === "my-tweets") {
		for (var i = 0; i < tweets.length; i++) {
			if (tweets.length === 21) {
				break;
			}
			console.log(tweets[i].user.name + ' tweeted "' + tweets[i].text + '" at ' + tweets[i].created_at + '.');
			// console.log(tweets[i].created_at);
			// console.log(tweets[i].text);
			// console.log(tweets[i].user.name)
			console.log("--------------");

		}
	}
});

//spotify-this-song:
	//example: node liri.js spotify-this-song '<song name here>'
	//This will show the following information about the song in your bash window: artist(s), the song's name, a preview link of the song from Spotify, and the album that the song is from
	//if no song is provided then your program will default to "The Sign" by Ace of Base

//movie-this:
	//example: node liri.js movie-this '<movie name here>'
	//this will output the following info: 
		/*Title of the movie.
		Year the movie came out.
		IMDB Rating of the movie.
		Country where the movie was produced.
		Language of the movie.
		Plot of the movie.
		Actors in the movie.
		Rotten Tomatoes URL.*/
	//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
		//"If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/"
		//"It's on Netflix!"

//do-what-it-says: Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
	//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
	//Feel free to change the text in that document to test out the feature for other commands.


//bonus
	//In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
	//Make sure you append each command you run to the log.txt file.
	//Do not overwrite your file each time you run a command.
