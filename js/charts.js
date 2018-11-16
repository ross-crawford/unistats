$(document).ready(function() {
  // Statistics scripts for ajax requests and rendering charts
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

  const fetchParams = {
    method: "GET",
    mode: "cors"
  };
  let yLabel;

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
        console.log("Error Getting Data From Worldbank API");
      });
  }

  for (i = 0; i < url.length; i++) {
    if (i === 0) {
      yLabel = "Number of Students";
    } else {
      yLabel = "Percentage of Students";
    }
    fetchApiData(url[i], fetchParams, containers[i], yLabel);
  }
});
