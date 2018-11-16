// Wrap all functionality in document ready function
$(document).ready(function() {
  // responsive navbar icon to change from bars to cross on open/close
  $(".menu-toggle").click(function() {
    $("nav").toggleClass("active");
    if ($(".menu-toggle > i").hasClass("fa-bars")) {
      $(".menu-toggle > i").removeClass("fa-bars");
      $(".menu-toggle > i").addClass("fa-times");
    } else {
      $(".menu-toggle > i").removeClass("fa-times");
      $(".menu-toggle > i").addClass("fa-bars");
    }
  });

  // toggle the active class on the about link in nav bar when clicked
  // open the scroll-to-top button
  $("#about-link").click(function() {
    $("#about-link").addClass("active");
    $(".gotop").slideToggle();
  });

  // close the go-to-top button and remove active from about link when clicked
  $(".gotop").click(function() {
    $(".gotop").slideToggle();
    $("#about-link").removeClass("active");
  });

  // close the go-to-top button and remove active from about link when logo clicked
  $(".logo").click(function() {
    $(".gotop").slideToggle();
    $("#about-link").removeClass("active");
  });

  // Mustache.js template for rendering job information
  var jobTemplate =
    '<div class="job-card">' +
    '<div class="job-title">{{title}}</div>' +
    '<div class="job-content">' +
    '<div class="job-desc">' +
    "<strong>Description</strong><br />{{description}}" +
    "</div>" +
    '<div class="job-req">' +
    "<strong>Requirements</strong><br />{{qualifications}}" +
    '</div><div class="job-tasks">' +
    "<strong>Tasks</strong><br />{{tasks}}</div></div></div>";

  // Mustache.js template for rendering uni information
  var uniTemplate =
    '<div class="uni-card"><div class="uni-name">{{name}}</div>' +
    '<div class="uni-link">Visit the website at <a href="{{web_pages}}" target="_blank" class="yellow">{{web_pages}}</a></div></div>';

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

  function noUniResults() {
    if (!$("#uni-results").children().length > 0) {
      $("#uni-results").append("No results found");
      count = 0;
    }
  }
  function noCareerResults() {
    if (!$("#results").children().length > 0) {
      $("#results").append("No results found");
      count = 0;
    }
  }
  // Append search query to url and return ajax request and render uni results
  $(".uni-search").click(function() {
    var query = $(".search-txt").val();
    console.log(query);
    var url = "data/data.json";
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

  // Append search query to url and return ajax request and render job results
  $(".career-search").click(function() {
    var query = $(".search-txt").val();
    var count = 0;
    $.ajax({
      url: "https://api.lmiforall.org.uk/api/v1/soc/search?q=" + query,
      dataType: "json",
      success: function(result) {
        $("#results").empty();
        result.forEach(job => {
          $("#results").append(Mustache.render(jobTemplate, job));
          count++;
          if (count === result.length) {
            noCareerResults();
          }
        });
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $("#results").empty();
        $("#results").append(
          '<div class="err-message">Please enter a valid search request</div>'
        );
      }
    });
  });

  // Append popular search link clicked to search query and return ajax request and render results
  $(".pop-tags").click(function() {
    var query = $(this).text();
    $(".search-txt").val(query);
    $.ajax({
      url: "https://api.lmiforall.org.uk/api/v1/soc/search?q=" + query,
      dataType: "json",
      success: function(result) {
        $("#results").empty();
        result.forEach(job => {
          $("#results").append(Mustache.render(jobTemplate, job));
        });
      }
    });
  });

  // slideToggle to open and close job results expanding box
  $("#results").on("click", ".job-title", function() {
    $(".job-content").slideUp();
    $(this)
      .siblings()
      .slideToggle();
  });

  // slideToggle to open and close uni results expanding box
  $("#uni-results").on("click", ".uni-name", function() {
    $(".uni-link").slideUp();
    $(this)
      .siblings()
      .slideToggle();
  });

  // slideToggle to open and close uni results expanding box
  $("#stat-results-small").on("click", ".stat-title", function() {
    $(this)
      .siblings()
      .fadeToggle();
  });
  // slideToggle to open and close uni results expanding box
  $("#stats-results-big").on("click", ".stat-title", function() {
    $(".stat-data").slideUp();
    $(this)
      .siblings()
      .slideToggle();
  });
});
