let times = [];
$(document).ready(function(){
  var $body = $('.main');
  $body.html('');
  let watchUser;
  let filteredTweets;
  let history = streams.home.slice();
    let prefix = streams.home;

  let formatTweet = function(tweet){
    // Take in a tweet object.  Format it and append it to the DOM.
    var $tweet = $('<a class="twit"></a>');
    var $user = $('<span class = "user"></span>"');
    var $message = $('<span class = "message"></span>');

    // Time 
    var $time = $('<span class = "timestamp' + index + '"></span>');
    var timeText = '' + timeSincePosted(tweet.created_at) + ' ago.';
    $time.text(timeText);

    $user.text('@' + tweet.user + ':');
    $message.text(tweet.message);

    $user.appendTo($tweet);
    $message.appendTo($tweet);
    $time.appendTo($tweet);
    $tweet.appendTo($body);
  }

    // Main Page Logic
  var index = prefix.length - 1;
  while(index >= 0){

    var tweet = prefix[index];
    history.push(tweet);
    var $tweet = $('<a class="twit"></a>');

    formatTweet(tweet);

    index -= 1;
   }
  

  (function(){
    index = prefix.length - 1;
    prev_index = index;
    setInterval(function(){
      current_index = prefix.length - 1;
      curr_ind_ref = prefix.length - 1;
      var new_group_of_tweets = [];


      while(current_index > prev_index){
        var tweet = prefix[current_index];
        history.push(tweet);

        formatTweet(tweet);
        
        current_index -= 1;
      }
      for (let idx = new_group_of_tweets.length - 1; idx >= 0; idx--){
        new_group_of_tweets[idx].prependTo($body);
      }
      prev_index = curr_ind_ref;
      
      for (let idx = 0; idx < prefix.length; idx++){
        $('.timestamp' + idx.toString()).text(timeSincePosted(prefix[idx].created_at) + ' ago.');
      }
    }, 5000);
  })();  


  $(document).on('click', '.twit', function(){

    watchUser = $(this).find('.user').text();
    watchUser = watchUser.slice(1);
    watchUser = watchUser.slice(0, watchUser.length - 1);
    prefix = streams.users[watchUser];

    $('.main').empty();

    $('.view').text('Here are ' + watchUser + "'s texts.");
    $('.view').append('<button class="backButton">See all users</button>')
    filteredTweets = _.filter(history, function(tweet){
      return tweet.user === watchUser;
    });
    for (let idx = filteredTweets.length - 1; idx >= 0; idx--){
      formatTweet(filteredTweets[idx]);
    }
  });

  $(document).on('click', '.backButton', function(){
    $('.main').empty();
     for (let idx = 0; idx < history.length; idx++){
       $('.view').text('Things are getting weird on Twittler.')
       formatTweet(history[idx]);
    }
  });

});


