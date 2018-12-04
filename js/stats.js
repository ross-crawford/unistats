$(document).ready(function() {
  // Statistics urls for ajax requests and rendering charts
  const url = [
    "https://api.worldbank.org/v2/countries/GBR/indicators/SE.TER.ENRL?date=2008:2015&format=json",
    "https://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F600?date=2008:2015&format=json",
    "https://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F140?date=2008:2015&format=json",
    "https://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F500?date=2008:2015&format=json",
    "https://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F700?date=2008:2015&format=json",
    "https://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F200?date=2008:2015&format=json",
    "https://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F400?date=2008:2015&format=json",
    "https://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F800?date=2008:2015&format=json",
    "https://api.worldbank.org/v2/countries/GBR/indicators/UIS.FOSEP.56.F300?date=2008:2015&format=json"
  ];
  // HTML element ID for each container stored as consts
  const containers = [
    "chart1",
    "chart2",
    "chart3",
    "chart4",
    "chart5",
    "chart6",
    "chart7",
    "chart8",
    "chart9"
  ];

  // fetch API parameters for use in fetchApiData function
  const fetchParams = {
    method: "GET",
    mode: "cors"
  };
  let yLabel;

  // Function for rendering the bar charts on the page
  // ZingChart JS library for rendering charts with API data
  // https://www.zingchart.com/
  function fetchApiData(apiUrl, param, container, label) {
    fetch(apiUrl, param)
      .then(res => {
        if (!res.ok) {
          throw new TypeError(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        const resultSet = data[1];
        let resultData = [];
        resultSet.forEach(function(result) {
          resultData.unshift([result.date, result.value]);
        });
        const chartData = {
          type: "bar",
          title: {
            adjustLayout: true
          },
          scaleX: {
            label: {
              text: "Year"
            },
            item: {
              angle: "-45"
            }
          },
          scaleY: {
            label: {
              text: label
            }
          },
          series: [
            {
              values: resultData,
              backgroundColor: "#fbc531",
              alpha: 0.7
            }
          ],
          plotarea: {
            margin: "dynamic"
          }
        };
        zingchart.render({
          id: container,
          data: chartData,
          height: "90%",
          width: "90%"
        });
      })
      .catch(err => {
        console.log(`Error Getting Data From Worldbank API: ${err}`);
      });
  }
  // for loop to iterate through the urls and return a yLabel for each one
  // only the first one which is 'Number' instead of 'Percentage'
  for (i = 0; i < url.length; i++) {
    if (i === 0) {
      yLabel = "Number of Students";
    } else {
      yLabel = "Percentage of Students";
    }
    // Run the function and pass in parameters
    fetchApiData(url[i], fetchParams, containers[i], yLabel);
  }

  // slideToggle to open and close uni results expanding box
  $("#stats-results").on("click", ".stat-title", function() {
    $(this)
      .siblings()
      .slideToggle();
  });
});
