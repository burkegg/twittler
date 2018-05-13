$(document).ready(function(){
	var $main = $('.main');
	$main.html('');
	var history = [];
	var prefix = streams.home;

	// Load initial
	// Add init to history

	let postTweet = function(tweet, home_idx){
		var $tweet = $('<a class="twit"></a>');
    	var $user = $('<span class = "user"></span>"');
    	var $message = $('<span class = "message"></span>');
    	var $time = $('<span class = "timestamp' + home_idx + '"></span>');
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
	    if (streams.home.length > 0){
			let pre_loop_idx = current_prefix.length - 1;
			for (let idx = 0; idx < pre_loop_idx; idx++){
				let aTweet = current_prefix[idx];
				postTweet(aTweet, idx);

			}
		}
	}
    
	postAllTweets(streams.home);
    // Interval:   prefix should be "prefix - should change based"
    // for all new tweets...
    //.   add to history
    //.   add to page

    
    	let counter = 0;
    	let bottom_of_loop_idx = history.length - 1;
		setInterval(function(){
  			let top_of_loop_idx = prefix.length - 1;
  			for (let idx = bottom_of_loop_idx; idx <= top_of_loop_idx; idx++){
  				postTweet(prefix[idx], idx);
  			}
  			bottom_of_loop_idx = top_of_loop_idx;



  			// for all tweets - don't worry about which prefix - just do all of them.
    		//.   update time
    		counter++;
    		for (let idx = 0; idx < prefix.length; idx++){
    			//$('.timestamp' + idx.toString()).text(timeSincePosted(streams.home[idx].created_at));
    		    //$('.timestamp' + idx.toString()).text('my index:  ' + idx + ' counter: ' + counter);
    		    console.log(idx);
    		    $('.timestamp' + idx.toString()).text(timeSincePosted(prefix[idx].created_at));
			}

    	}, 5000) // End of interval.

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




})