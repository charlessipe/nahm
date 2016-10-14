


/* alert("hello"); */

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCbqUgLObGp-B-Aubjw--OSsRrpgdXGR0U",
    authDomain: "shower-water-flow-381ec.firebaseapp.com",
    databaseURL: "https://shower-water-flow-381ec.firebaseio.com",
    storageBucket: "shower-water-flow-381ec.appspot.com",
    messagingSenderId: "748413230083"
  };
  firebase.initializeApp(config);


  // Get a reference to the database service
  var database = firebase.database();


  // display current amount in view
  var currentFlow = firebase.database().ref('/rawdata/');
    currentFlow.on('value', function(snapshot) {
    var currentFlowData = snapshot.val();  

    for (var key in currentFlowData) {
        if (currentFlowData.hasOwnProperty(key)) {

          var currentFlowRate = (currentFlowData[key].amount / 5)
          // update "Current Flow"
          $(".current-flow").text(currentFlowRate + " mL/sec");
 
        }
    };

  });
  
  // var is raw data because it was using the rawdata object previously but should be session data
  var rawData = firebase.database().ref('/sessions/');
    rawData.on('value', function(snapshot) { 
    var currentRawData = snapshot.val();

    var totalMonthWater = 0;

    var totalMonthShower = 0;
    var totalMonthSink = 0;
    var totalMonthWashingMachine = 0;
    var totalMonthBath = 0;
    var totalMonthHose = 0;
    var totalMonthBeer = 0;
    var totalMonthToilet = 0;

    var sortSessionData = [];


      for (var key in currentRawData) {
        if (currentRawData.hasOwnProperty(key)) {
          
          totalMonthWater =  totalMonthWater + currentRawData[key].amount; 

          sortSessionData.push(currentRawData[key]);

          if (currentRawData[key].deviceId == 1){

            totalMonthShower = totalMonthShower + currentRawData[key].amount;

          } else if (currentRawData[key].deviceId == 2){

            totalMonthSink = totalMonthSink + currentRawData[key].amount;

          } else if (currentRawData[key].deviceId == 3){

            totalMonthWashingMachine = totalMonthWashingMachine + currentRawData[key].amount;

          } else if (currentRawData[key].deviceId == 4){

            totalMonthBath = totalMonthBath + currentRawData[key].amount;

          } else if (currentRawData[key].deviceId == 5){

            totalMonthHose = totalMonthHose + currentRawData[key].amount;

          } else if (currentRawData[key].deviceId == 6){

            totalMonthBeer = totalMonthBeer + currentRawData[key].amount;

          } else if (currentRawData[key].deviceId == 7){

            totalMonthToilet = totalMonthToilet + currentRawData[key].amount;

          }

       
      };


      function getAmountString(amount) {
        var unit = "mL";
          if (amount > 1000) {
            amount = parseInt(amount / 1000);
            unit = "L"
          }
        return amount + " " + unit;
      }


      totalMonthShowerL = totalMonthShower/1000;
      totalMonthSinkL = totalMonthSink/1000;
      totalMonthWashingMachineL = totalMonthWashingMachine/1000;
      totalMonthBathL = totalMonthBath/1000;
      totalMonthHoseL = totalMonthHose/1000;
      totalMonthBeerL = totalMonthBeer/1000;
      totalMonthToiletL = totalMonthToilet/1000;

      console.log(totalMonthWater);
      console.log("Total month shower:" + totalMonthShowerL);
      console.log("Total month sink:" + totalMonthSinkL);
      console.log("Total month washing machine:" + totalMonthWashingMachineL);
      console.log("Total month bath:" + totalMonthBathL);
      console.log("Total month hose:" + totalMonthHoseL);
      console.log("Total month beer:" + totalMonthBeerL);
      console.log("Total month toilet:" + totalMonthToiletL);
      
      //render donut graph

      var cty = document.getElementById("myChartDonut");
      var myDoughnutChart = new Chart(cty, {
        type: 'doughnut',
        data: {
          labels: [
              "Shower",
              "Sink",
              "WMachine",
              "Bath",
              "Hose",
              "Beer"
          ],
          datasets: [
              {
                  data: [totalMonthShowerL, totalMonthSinkL, totalMonthWashingMachineL, totalMonthBathL, totalMonthHoseL, totalMonthBeerL],
                  backgroundColor: [
                      "#00cfdc",
                      "#36A2EB",
                      "#FFCE56",
                      "#2FACB2",
                      "#cc65fe",
                      "orange"
                  ],
                  hoverBackgroundColor: [
                      "#00cfdc",
                      "#36A2EB",
                      "#FFCE56",
                      "#2FACB2",
                      "#cc65fe",
                      "orange"
                  ]
              }]
        },
        options: {}
      });

      //render bar graph

      var ctx = document.getElementById("myChart");
      //$('#myChart').remove(); // this is my <canvas> element
      //$('.water-use-device').append('<canvas id="myChart" width="400" height="250"></canvas>'); 

      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Shower", "Sink", "Washing", "Bath", "Hose", "Beer"],
                      datasets: [{
                          label: 'Liters',
                          data: [totalMonthShowerL, totalMonthSinkL, totalMonthWashingMachineL, totalMonthBathL, totalMonthHoseL, totalMonthBeerL],
                          backgroundColor: [
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              'orange'
                          ],
                          borderColor: [
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              'orange'
                          ],
                          borderWidth: 1
                      }]
                  },
                  options: {
                      scales: {
                          yAxes: [{
                              ticks: {
                                  beginAtZero:true
                              }
                          }]
                      }
                  }
              });       
         

      // update "Water Usage This Month"
      //totalMonthLiters = totalMonthWater/1000;
      $(".total-month-liters").text(getAmountString(totalMonthWater));


      console.log(sortSessionData);
      // sort array by descending date
      sortSessionData.sort(function(a, b) {
        return parseFloat(a.startTime) - parseFloat(b.startTime);
      });
      sortSessionData.reverse();

      var deviceImages = [
       "images/shower.png",
       "images/shower.png",
       "images/kitchen-sink.png",
       "images/washing-machine.png",
       "images/bath.png",
       "images/hose.png",
       "images/beer.png",
       "images/toilet.png"
      ];

      /*
      var deviceMap = {
         "shower": 1,
         "sink": 2,
         "washingmachine": 3,
         "bath": 4,
         "hose": 5,
         "beer": 6,
         "toilet": 7
      };
      */

      console.log(sortSessionData);
      
      $(".append-water-table").empty();

      for (var i = 0; i < sortSessionData.length; i ++){

        

        function getAmountString(amount) {
          var unit = "mL";
          if (amount > 1000) {
            amount = parseInt(amount / 1000);
            unit = "L"
          }
          return amount + " " + unit;
        }
        
        $( ".append-water-table" ).hide().append( "<tr> <td> <img src='" +deviceImages[sortSessionData[i].deviceId]+ "'> </td> <td>" + moment.unix(sortSessionData[i].startTime).format("MMM DD h:mm A") + "</td><td>" + getAmountString(sortSessionData[i].amount) + " </td> </tr>" ).fadeIn(800);
      
        
      }


    };


  });

  /*
      var deviceMap = {
         "shower": 1,
         "sink": 2,
         "washingmachine": 3,
         "bath": 4,
         "hose": 5,
         "beer": 6,
         "toilet": 7
      };
      */

  

 