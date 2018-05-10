let timeSincePosted = function(timePosted){
  let msPosted = timePosted.getTime();
  let curr = new Date();
  let postedAgo = curr - msPosted;
  console.log(postedAgo);
  return formatDuration(postedAgo);
}


let formatDuration = function (milliseconds) {
/*
Take in a number of ms, and convert it to a readable time.
*/
  let seconds = milliseconds / 1000;
  if (seconds === 0){
    return 'now';
  }
  let secondsInYear = 60 * 60 * 24 * 365;
  let secondsInDay = 60 * 60 * 24;
  let secondsInHour = 60 * 60;
  let secondsInMin = 60;
  let years = Math.floor(seconds / secondsInYear);
  let textOut = '';
  let tempString = '';
  let arrayOfDurations = [];
  if (years > 0) {
    if (years > 1) {
      tempString = String(years) + ' ' + 'years';
    } else {
      tempString = String(years) + ' ' + 'year';
    }
    arrayOfDurations.push(tempString);
      seconds = seconds - years * secondsInYear;
      tempString = '';

  }

  let days = Math.floor(seconds / secondsInDay);
  if (days > 0) {
    if (days > 1) {
      tempString = String(days) + ' ' + 'days';
    }else{
      tempString = String(days) + ' ' + 'day';
    }
    arrayOfDurations.push(tempString);
      seconds = seconds - days * secondsInDay;
    tempString = '';
  }
  
  let hours = Math.floor(seconds / secondsInHour);
  if (hours > 0){
    if (hours > 1){
      tempString = String(hours) + ' hours';
    }else{
      tempString = String(hours) + ' hour';
    }
    arrayOfDurations.push(tempString);
      seconds = seconds - hours * secondsInHour;
    tempString = '';
  }
  
  
  let minutes = Math.floor(seconds / secondsInMin);
  if (minutes > 0){
    if (minutes > 1){
      tempString = String(minutes) + ' minutes';
    }else{
      tempString = String(minutes) + ' minute';
    }
    arrayOfDurations.push(tempString);
    seconds = seconds - minutes * secondsInMin;
    tempString = '';
  }

  
  if (seconds > 0){
          seconds = Math.round(seconds);

    if (seconds > 1){
      tempString = String(seconds) + ' seconds';
    }else{
      tempString = String(seconds) + ' second';
    }
    arrayOfDurations.push(tempString);
  }
  console.log(arrayOfDurations);
  return helperJoin(arrayOfDurations);
}

function helperJoin(array){
  let text = '';
  if (array.length > 2){
    for (let idx = 0; idx < array.length -1; idx++){
      text += array[idx];
      if (idx < array.length - 2){
        text += ', ';
      }
    }
    text += ' and ' + array[array.length-1];
  }
  else if (array.length ===2){
    text = array[0] + ' and ' + array[1];
  }else{
    text = array[0];
  }
  return text;
}