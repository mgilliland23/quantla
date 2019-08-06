$(document).ready(function() {
  // $.get("api/news", function(data) {
  //   console.log(data[0]);
  // });
  $.get("api/prices", function(data) {
    console.log(data);
  });
  $.get("api/fundamentals", function(data) {
    console.log(data);
  });
});
