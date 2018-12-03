$(document).ready(function() {
  // Mustache.js template for rendering popular searches
  let popSearchTemplate = `<a href="#" class="tags pop">{{query}}</a>`;

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

  popularSearches();
  // Append search query to url and return ajax request and render job results
  $("#jobsearch-form").submit(function(e) {
    jobSearch();

    // $.ajax({
    //   type: "POST",
    //   url: "./includes/job_search.php",
    //   cache: false,
    //   data: {
    //     text: search
    //   },
    //   success: function(response) {
    //     console.log(input);
    //   }
    // });
    // Declare request variable for use later
    let request;
    // Prevent default action when form submitted
    e.preventDefault();
    // Check if a request is in place, if so, abort it
    if (request) {
      request.abort();
    }
    // Declare form variable as this
    let $form = $(this);
    // Find all the inputs in the form
    let $inputs = $form.find("input, button");
    // Serialize the data into a string
    let searializedData = $form.serialize();
    // Disable inputs for now
    $inputs.prop("disabled", true);
    // AJAX request for POST to php file
    request = $.ajax({
      url: "./includes/job_search.php",
      type: "POST",
      data: searializedData
    });
    // Callback handler that will be called on success
    request.done(function(response, textStatus, jqXHR) {
      console.log("Hooray! It worked!");
      console.log(searializedData);
    });
    // Callback handler that will be called on failure
    request.fail(function(jqXHR, textStatus, errorThrown) {
      console.error("The following error occurred: " + textStatus, errorThrown);
    });
    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function() {
      // Reenable the inputs
      $inputs.prop("disabled", false);
    });
  });

  // On click to retreive soc code from data-attribute and run avgPay function
  $("#results").on("click", ".more-btn", function() {
    let soc = $(this).attr("data-attribute");
    let container = $(this);
    console.log(`click worked to show soc code ${soc}`);
    avgPay(soc, container);
  });

  // Append popular search link clicked to search query and return ajax request and render results
  $(".tags").click(function() {
    let query = $(this).text();
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
  function jobSearch() {
    let query = $(".search-txt").val();
    let count = 0;
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
        // $("#results").empty();
        $("#results").append(Mustache.render(errorTemplate));
      }
    });
  }

  // Function which takes search query and adds it to db
  function postSearchQuery() {}

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
      error: console.log(`this didn't work`)
    });
  }

  // Function to render the most recent searches to the page
  function recentSearchess() {
    console.log("recent searches loaded");
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

  $("#results").on("click", ".error-ok", function() {
    $(".err-message").fadeOut();
  });
});
