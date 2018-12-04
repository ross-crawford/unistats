$(document).ready(function() {
  // Mustache.js template for rendering popular searches
  let popSearchTemplate = `<a href="#" class="tags pop">{{query}}</a>`;
  // Mustache.js template for rendering recent searches
  let recSearchTemplate = `<a href="#" class="tags rec">{{query}}</a>`;

  // Mustache.js template for rendering job information
  let jobTemplate = `<div class="job-card">
      <div class="job-title">{{title}}</div>
      <div class="job-content">
        <div class="job-desc">
          <strong>Description</strong><br />{{description}}
        </div>
        <div class="job-req">
          <strong>Requirements</strong><br />{{qualifications}}
        </div>
        <div class="job-tasks">
          <strong>Tasks</strong><br />{{tasks}}
        </div>
        <div class="job-pay">
          <strong>Average Pay</strong><br /><div class="more-btn margins" data-attribute="{{soc}}">Click to see average pay details</div>
        </div>
      </div>
    </div>`;

  let payTemplate = `<strong>{{year}}:</strong> £{{estpay}} per week at age 25<br />`;

  let errorTemplate = `<div class="err-message">
      <div class="error-text">That is not a valid search, please try again</div>
      <div class="error-ok">OK</div>
    </div>`;

  // Button click for form
  // $('.search-btn').on('click', function() {
  //   let query = $('.search-txt')
  // });
  $(".popular-tag").on("click", function() {
    popularSearches();
  });
  $(".recent-tag").on("click", function() {
    recentSearches();
  });

  // Append search query to url and return ajax request and render job results
  $("body").on("click", ".career-search", function() {
    let query = $(".search-txt").val();
    console.log(`input received as ${query}`);
    jobSearch(query);
  });

  // On click to retreive soc code from data-attribute and run avgPay function
  $("#results").on("click", ".more-btn", function() {
    let soc = $(this).attr("data-attribute");
    let container = $(this);
    avgPay(soc, container);
  });

  // Append popular search link clicked to search query and return ajax request and render results
  $("#results").on("click", ".tags", function() {
    let query = $(this).text();
    $(".search-txt").val(query);
    $.ajax({
      url: `https://api.lmiforall.org.uk/api/v1/soc/search?q=${query}`,
      dataType: "json",
      success: function(result) {
        $("#results").empty();
        result.forEach(job => {
          $("#results").append(Mustache.render(jobTemplate, job));
        });
      }
    });
  });
  // Average pay ajax request
  function avgPay(soc, con) {
    console.log(soc);
    $.ajax({
      url: `http://api.lmiforall.org.uk/api/v1/ashe/estimatePay?soc=${soc}&age=25&coarse=false`,
      dataType: "json",
      success: function(res) {
        let data = res.series;
        con.empty();
        con.removeClass("more-btn");
        data.forEach(pay => {
          con.append(Mustache.render(payTemplate, pay));
        });
      }
    });
  }
  // Render job search results from api
  function jobSearch(query) {
    let data = query;
    console.log(`The function to search with the query: ${data} is running`);
    $.ajax({
      url: `https://api.lmiforall.org.uk/api/v1/soc/search?q=${query}`,
      dataType: "json",
      success: function(result) {
        console.log(`the success function from the search ajax is running`);
        $("#results").empty();
        postSearch(data);
        result.forEach(job => {
          $("#results").append(Mustache.render(jobTemplate, job));
        });
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        $("#results").empty();
        $("#results").append("No results found");
      }
    });
  }
  // Function to ajax POST search query to database
  function postSearch(query) {
    console.log(`the post search function is running`);
    let data = query;
    $.ajax({
      type: "POST",
      url: "./includes/job_search.php",
      data: { data: data },
      success: function() {
        console.log("the post search ajax is a success");
      },
      error: function() {
        console.log("wtf man?");
      }
    });
  }
  // Function to render the most popular searches to the page
  function popularSearches() {
    let container = $(".popular");
    $.ajax({
      url: "./includes/pop_tags.php",
      dataType: "json",
      success: function(data) {
        console.table(data);
        data.forEach(query => {
          container.append(Mustache.render(popSearchTemplate, query));
        });
      },
      error: function() {
        console.log(`this didn't work`);
      }
    });
  }
  // Function to render the most recent searches to the page
  function recentSearches() {
    let container = $(".recent");
    $.ajax({
      url: "./includes/rec_tags.php",
      dataType: "json",
      success: function(data) {
        console.table(data);
        data.forEach(query => {
          container.append(Mustache.render(recSearchTemplate, query));
        });
      },
      error: function() {
        console.log(`this didn't work`);
      }
    });
  }

  // If search string finds no career matches function
  function noCareerResults() {
    if (!$("#results").children().length > 0) {
      $("#results").append(Mustache.render(errorTemplate));
    }
  }

  // slideToggle to open and close job results expanding box
  $("#results").on("click", ".job-title", function() {
    $(this)
      .siblings()
      .slideToggle();
  });

  // fadeOut error dialogue when OK button clicked
  $("#results").on("click", ".error-ok", function() {
    $(".err-message").fadeOut();
  });
});
