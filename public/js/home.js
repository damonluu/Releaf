var currentCount = 1;
var quotes = ["YOU ARE VALUED.","BE POSITIVE.","LOVE YOURSELF."];

window.setInterval(function() {
  var element = document.getElementById("quote").innerHTML = quotes[currentCount];
  if(currentCount == quotes.length - 1){
    currentCount = 0;
  }
  else {
    currentCount = currentCount + 1;
  }
  console.log(quotes[currentCount]);
  var quote = document.querySelector('#quote')
  quote.classList.add('text-focus-in');

}, 3000);
