$(document).ready(function() {
  // Mustache.js template for rendering uni information
  let uniTemplate = `<div class="uni-card"><div class="uni-name">{{name}}</div>
    <div class="uni-link">Visit the website at <a href="{{web_pages}}" 
    target="_blank" class="yellow">{{web_pages}}</a></div></div>`;

  // Render the list of universities with ajax
  $.ajax({
    url: "data/data.json",
    dataType: "json",
    success: function(results) {
      results.forEach(uni => {
        $("#uni-results").append(Mustache.render(uniTemplate, uni));
      });
    }
  });

  // Append search query to url and return ajax request and render uni results
  $(".uni-search").click(function() {
    let query = $(".search-txt").val();
    console.log(`Displaying results for "${query}"`);
    const url = "data/data.json";
    var count = 0;
    $.ajax({
      url: url,
      dataType: "json",
      success: function(results) {
        $("#uni-results").empty();
        results.forEach(uni => {
          if (uni.name.toLowerCase().includes(query.toLowerCase())) {
            $("#uni-results").append(Mustache.render(uniTemplate, uni));
          }
          count++;
          if (count === results.length) {
            noUniResults();
          }
        });
      }
    });
  });

  // If search string finds no uni matches function
  function noUniResults() {
    if (!$("#uni-results").children().length > 0) {
      $("#uni-results").append("No results found");
      count = 0;
    }
  }

  // slideToggle to open and close uni results expanding box
  $("#uni-results").on("click", ".uni-name", function() {
    $(".uni-link").slideUp();
    $(this)
      .siblings()
      .slideToggle();
  });
});
