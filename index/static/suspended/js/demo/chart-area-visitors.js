// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

 // TODO https://axios-http.com/docs/example
  // Optionally the request above could also be done as
  axios.get('/parking/api/parking_sessions', {
    params: {
    ID: 12345
    }
})


  .then(function (response) {
      // console.log(response);
      // console.log(response.data);

      // https://axios-http.com/docs/res_schema
      const array = response.data;
      let mon_total= 0;
      let tue_total= 0;
      let wed_total= 0;
      let thu_total= 0;
      let fri_total= 0;
      let sat_total= 0;
      let sun_total= 0;


      for (let index = 0; index < array.length; index++) {
          const parking_session = array[index];
    
          if (parking_session.id == null){
            parking_session.id = 0
          }


          var arr = [parking_session.id];
          var len = arr.length
          
          const days_of_week = ["sun", "mon","tue","wed","thu","fri","sat" ]

          const date = new Date(parking_session.premise_session.time_in);
          const day = days_of_week[date.getDay()]; // Sunday - Saturday : 0 - 6

          switch (day) {
            case "mon":
              mon_total += len
              break;
            case "tue":
              tue_total += len
              break;
            case "wed":
              wed_total += len
              break;
            case "thu":
              thu_total += len
              break;
            case "fri":
              fri_total += len
              break;
            case "sat":
              sat_total += len
              break;
            case "sun":
              sun_total += len
              break;
            default:
              break;
          }

          // total += array[index].id;
          total = [mon_total, tue_total, wed_total, thu_total, fri_total, sat_total, sun_total];
      }





      const array2 = response.data;
      let mond_total= 0;
      let tues_total= 0;
      let wedn_total= 0;
      let thur_total= 0;
      let frid_total= 0;
      let satu_total= 0;
      let sund_total= 0;


      for (let index = 0; index < array.length; index++) {
          const parking_session = array[index];
    
          if (parking_session.premise_session.id == null){
            parking_session.id = 0
          }


          var arr = [parking_session.id];
          var len = arr.length
          
          const days_of_week = ["sund", "mond","tues","wedn","thur","frid","satu" ]

          const date = new Date(parking_session.premise_session.time_in);
          const day = days_of_week[date.getDay()]; // Sunday - Saturday : 0 - 6

          switch (day) {
            case "mond":
              mond_total += len
              break;
            case "tues":
              tues_total += len
              break;
            case "wedn":
              wedn_total += len
              break;
            case "thur":
              thur_total += len
              break;
            case "frid":
              frid_total += len
              break;
            case "satu":
              satu_total += len
              break;
            case "sund":
              sund_total += len
              break;
            default:
              break;
          }

          // total += array[index].id;
          total2 = [mond_total, tues_total, wedn_total, thur_total, frid_total, satu_total, sund_total];
      }





      initChart(total);
      persons(total);



  })

  .catch(function (error) {
      console.log(error);
  })

  .then(function () {
      // always executed
  }); 

  function initChart(total) {
    var ctx = document.getElementById("myAreaChart");
    var main = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "",
          lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          // data: [total, total, total, total, total, total, total],
          data: total,
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return '' + number_format(value);
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function(tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return  number_format(tooltipItem.yLabel) +  datasetLabel + ': Vehicle(s) ';
            }
          }
        }
      }
    });
  }



  function persons(total) {
    var cty = document.getElementById("myChart");
    var main = new Chart(cty, {
      type: 'line',
      data: {
        labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"],
        datasets: [{
          label: "",
          lineTension: 0.3,
          backgroundColor: "rgba(78, 115, 223, 0.05)",
          borderColor: "rgba(78, 115, 223, 1)",
          pointRadius: 3,
          pointBackgroundColor: "rgba(78, 115, 223, 1)",
          pointBorderColor: "rgba(78, 115, 223, 1)",
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
          pointHoverBorderColor: "rgba(78, 115, 223, 1)",
          pointHitRadius: 10,
          pointBorderWidth: 2,
          // data: [total, total, total, total, total, total, total],
          data: total2,
        }],
      },
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'date'
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 7
            }
          }],
          yAxes: [{
            ticks: {
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return '' + number_format(value);
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          intersect: false,
          mode: 'index',
          caretPadding: 10,
          callbacks: {
            label: function(tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return  number_format(tooltipItem.yLabel) +  datasetLabel + ': Vehicle(s) ';
            }
          }
        }
      }
    });
  }




























