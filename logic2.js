$(document).ready(function(){
    var $main = $('.main');
	$main.html('');
	var history = [];
	var prefix = streams.home;

	// Load initial
	// Add init to history

	let postTweet = function(tweet, home_idx){
		// Formats and posts a tweet to the page.
		var $tweet = $('<a class="twit"></a>');
		var $user = $('<span class = "user"></span>"');
		var $message = $('<span class = "message"></span>');
		var $time = $('<span class = "time timestamp' + home_idx + '"></span>');
		var timeText = '' + timeSincePosted(tweet.created_at) + ' ago.';
		$time.text(timeText);
		$user.text('@' + tweet.user + ':');
		$message.text(tweet.message);

		$user.appendTo($tweet);
		$message.appendTo($tweet);
		$time.appendTo($tweet);
		$tweet.prependTo($main);
		history.push(tweet);
	}

    // Pre-loop post of initial streams.home.  This should only happen once.
    let postAllTweets = function(current_prefix){
    	// Input an array of tweets and post them automatically.  This runs at
    	// first page load, and then again each time the view changes.
	    if (streams.home.length > 0){
			let pre_loop_idx = current_prefix.length - 1;
			for (let idx = 0; idx < pre_loop_idx; idx++){
				let aTweet = current_prefix[idx];
				postTweet(aTweet, idx);
				console.log('This is pre-loop ' + idx);
			}
		}
	}
       
	postAllTweets(streams.home);
    let counter = 0;
    let bottom_of_loop_idx = history.length;
	setInterval(function(){
		// Each interval should check for new tweets in the current prefix.
		// It should also update all timestamps for posted tweets.

  		let top_of_loop_idx = prefix.length - 1;
  		for (let idx = bottom_of_loop_idx; idx < top_of_loop_idx; idx++){
  			postTweet(prefix[idx], idx);
  			console.log('This is looping ' + idx);
  		}
  		bottom_of_loop_idx = top_of_loop_idx;

    	for (let idx = 0; idx < prefix.length; idx++){
    	$('.timestamp' + idx.toString()).text(timeSincePosted(prefix[idx].created_at));
		}
    }, 5000) 

	// A user can click on a tweet to see all of that user's tweets.
	$(document).on('click', '.twit', function(){
		watchUser = $(this).find('.user').text();
		watchUser = watchUser.slice(1, watchUser.length - 1);
		$('.main').empty();
		$('.view').text('Here are ' + watchUser + "'s texts");
		$('.view').append('<button class="backButton">See all users</button>');
		let filteredTweets = _.filter(history, function(tweet){
			return tweet.user = watchUser;
		});
		postAllTweets(streams.users[watchUser]);
		prefix = streams.users[watchUser];
	});

	// A user can click on the back button to see all of the tweets.
	$(document).on('click', '.backButton', function(){
		$('.main').empty();
		prefix = streams.home;
		$('.backButton').remove();
		postAllTweets(prefix);
		$('.view').text('Things are getting weird on Twittler.');
	});
});
