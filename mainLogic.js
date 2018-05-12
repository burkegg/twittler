let times = [];
$(document).ready(function(){
  var $body = $('.main');
  $body.html('');
  let watchUser;
  let filteredTweets;
  let prefix = streams.home;

/*
  // Test to see if on user's tweets page.
  if($('title').text() === "User's Tweets"){
    let times = [];
    index = streams.users.user.length - 1;
    while(index >= 0){
      var tweet = streams.users.user[index];
      var $tweet = $('<a class="twit"></a>');
      var $user = $('<span class = "user"></span>"');
      var $message = $('<span class = "message"></span>');
      var $time = $('<span class = "timestamp' + index + '"></span>');
      var timeText = '' + timeSincePosted(tweet.created_at) + ' ago.';
      $user.text('@' + tweet.user + ':  ');
      $message.text(tweet.message);
      $time.text(timeText);
      $user.appendTo($tweet);
      $message.appendTo($tweet);
      $time.appendTo($tweet);
      $tweet.appendTo($body);
      index -= 1;
     }
    
     // Update with new tweets every 5 seconds
     // Update the old tweet times.
    (function(){
      console.log("Inside the user tweets page");
      index = streams.users.user.length - 1;
      prev_index = index;
      setInterval(function(){
        current_index = streams.users.user.length - 1;
        curr_ind_ref = streams.users.user.length - 1;
        var new_group_of_tweets = [];


        while(current_index > prev_index){
          var tweet = streams.users.shawndrost[current_index];
          var $tweet = $('<a class="twit"></a>');
          var $user = $('<span class="user"></span>"');
          var $message = $('<span class="message"></span>');
          var $time = $('<span class = "timestamp' + current_index + '"></span>');
          var timeText = '' + timeSincePosted(tweet.created_at) + ' ago.';
          $user.text('@' + tweet.user + ':  ');
          $message.text(tweet.message);
          $time.text(timeText);
          $user.appendTo($tweet);
          $message.appendTo($tweet);
          $time.appendTo($tweet);

          new_group_of_tweets.push($tweet);
          current_index -= 1;
        }
        for (let idx = new_group_of_tweets.length - 1; idx >= 0; idx--){
          new_group_of_tweets[idx].prependTo($body);
        }
        prev_index = curr_ind_ref;

        for (let idx = 0; idx < streams.users.user.length; idx++){
          $('.timestamp' + idx.toString()).text(timeSincePosted(streams.users.user[idx].created_at) + ' ago.');
        }
      }, 5000);
    })();
  } else {
*/
    // ****** MAIN PAGE. ********
    // Main Page Logic
    var index = prefix.length - 1;
    while(index >= 0){

      var tweet = streams.home[index];

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
          var $tweet = $('<a class="twit"></a>');
          var $user = $('<span class="user"></span>"');
          var $message = $('<span class="message"></span>');
          var $time = $('<span class = "timestamp' + current_index + '"></span>');
          var timeText = '' + timeSincePosted(tweet.created_at) + ' ago.';
          $time.text(timeText);


          $user.text('@' + tweet.user + ':');
          $message.text(tweet.message);
          $user.appendTo($tweet);
          $message.appendTo($tweet);
          $time.appendTo($tweet);

          new_group_of_tweets.push($tweet);
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
  //}. ****** This brace closes else

// Global logic
// Get the username of the tweet that was clicked on.  Keep that global.
// only use on() on things that won't go away....ugh.
  $('.twit').on('click', function(){

    watchUser = $(this).find('.user').text();
    watchUser = watchUser.slice(1);
    watchUser = watchUser.slice(0, watchUser.length - 1);
    prefix = streams.users[watchUser];
    $('.main').empty();
    $('.view').text('Here are ' + watchUser + "'s texts.");
    $('.view').append('<button class = "backButton">See all users</button>')
    filteredTweets = _.filter(streams.home, function(tweet){
      if (tweet.hasOwnProperty(watchUser)){
        console.log('inside');
        return tweet;
      }
    });
    console.log(filteredTweets);
  });


});




