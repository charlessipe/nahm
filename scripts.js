


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
    var totalMonthKitchenSink = 0;
    var totalMonthBathSink = 0;

    var sortSessionData = [];


      for (var key in currentRawData) {
        if (currentRawData.hasOwnProperty(key)) {
          
          totalMonthWater =  totalMonthWater + currentRawData[key].amount; 

          sortSessionData.push(currentRawData[key]);

          if ((currentRawData[key].deviceId == 1 || (currentRawData[key].deviceId >=10 && currentRawData[key].deviceId <= 19))){

            totalMonthShower = totalMonthShower + currentRawData[key].amount;

          } else if ((currentRawData[key].deviceId == 2 || (currentRawData[key].deviceId >=20 && currentRawData[key].deviceId <= 29))){

            totalMonthSink = totalMonthSink + currentRawData[key].amount;

          } else if ((currentRawData[key].deviceId == 3 || (currentRawData[key].deviceId >=30 && currentRawData[key].deviceId <= 39))){

            totalMonthWashingMachine = totalMonthWashingMachine + currentRawData[key].amount;

          } else if ((currentRawData[key].deviceId == 4 || (currentRawData[key].deviceId >=40 && currentRawData[key].deviceId <= 49))){

            totalMonthBath = totalMonthBath + currentRawData[key].amount;

          } else if ((currentRawData[key].deviceId == 5 || (currentRawData[key].deviceId >=50 && currentRawData[key].deviceId <= 59))){

            totalMonthHose = totalMonthHose + currentRawData[key].amount;

          } else if ((currentRawData[key].deviceId == 6 || (currentRawData[key].deviceId >=60 && currentRawData[key].deviceId <= 69))){

            totalMonthBeer = totalMonthBeer + currentRawData[key].amount;

          } else if ((currentRawData[key].deviceId == 7 || (currentRawData[key].deviceId >=70 && currentRawData[key].deviceId <= 79))){

            totalMonthToilet = totalMonthToilet + currentRawData[key].amount;

          } else if ((currentRawData[key].deviceId == 8 || (currentRawData[key].deviceId >=80 && currentRawData[key].deviceId <= 89))){

            totalMonthKitchenSink = totalMonthKitchenSink + currentRawData[key].amount;

          } else if ((currentRawData[key].deviceId == 9 || (currentRawData[key].deviceId >=90 && currentRawData[key].deviceId <= 99))){

            totalMonthBathSink = totalMonthBathSink + currentRawData[key].amount;

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
      totalMonthKitchenSinkL = totalMonthKitchenSink/1000;
      totalMonthBathSinkL = totalMonthBathSink/1000;


      console.log(totalMonthWater);
      console.log("Total month shower:" + totalMonthShowerL);
      console.log("Total month sink:" + totalMonthSinkL);
      console.log("Total month washing machine:" + totalMonthWashingMachineL);
      console.log("Total month bath:" + totalMonthBathL);
      console.log("Total month hose:" + totalMonthHoseL);
      console.log("Total month beer:" + totalMonthBeerL);
      console.log("Total month toilet:" + totalMonthToiletL);
      console.log("Total month kitchen sink:" + totalMonthKitchenSinkL);
      console.log("Total month bath sink:" + totalMonthBathSinkL);
      
      //render donut graph

      var cty = document.getElementById("myChartDonut");
      var myDoughnutChart = new Chart(cty, {
        type: 'doughnut',
        data: {
          labels: [
              "Shower",
              "WSink",
              "WMachine",
              "Bath",
              "Hose",
              "Beer",
              "KSink",
              "BSink"
          ],
          datasets: [
              {
                  data: [totalMonthShowerL, totalMonthSinkL, totalMonthWashingMachineL, totalMonthBathL, totalMonthHoseL, totalMonthBeerL, totalMonthKitchenSinkL, totalMonthBathSinkL],
                  backgroundColor: [
                      "#00cfdc",
                      "#36A2EB",
                      "#FFCE56",
                      "#2FACB2",
                      "#cc65fe",
                      "orange",
                      "green",
                      "pink"
                  ],
                  hoverBackgroundColor: [
                      "#00cfdc",
                      "#36A2EB",
                      "#FFCE56",
                      "#2FACB2",
                      "#cc65fe",
                      "orange",
                      "green",
                      "pink"
                  ]
              }]
        },
        options: {
          events: ["click"]
        }
      });

      //render bar graph

      var ctx = document.getElementById("myChart");
      //$('#myChart').remove(); // this is my <canvas> element
      //$('.water-use-device').append('<canvas id="myChart" width="400" height="250"></canvas>'); 

      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["Shower", "Washroom Sink", "Washing Machine", "Bath", "Hose", "Beer", "Kitchen Sink", "Bath Sink"],
                      datasets: [{
                          label: 'Liters',
                          data: [totalMonthShowerL, totalMonthSinkL, totalMonthWashingMachineL, totalMonthBathL, totalMonthHoseL, totalMonthBeerL, totalMonthKitchenSinkL, totalMonthBathSinkL],
                          backgroundColor: [
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              'orange',
                              '#00cfdc',
                              '#00cfdc'
                          ],
                          borderColor: [
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              '#00cfdc',
                              'orange',
                              '#00cfdc',
                              '#00cfdc'
                          ],
                          borderWidth: 1
                      }]
                  },
                  options: {
                      events: ["click"],
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
       "images/kitchen-sink.png", // washroom sink
       "images/washing-machine.png",
       "images/bath.png",
       "images/hose.png",
       "images/beer.png",
       "images/toilet.png",
       "images/table-sink.png", // kitchen sink
       "images/bath-sink.png"
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


      var deviceImageNumber;

      if (sortSessionData[i].deviceId == 1 || (sortSessionData[i].deviceId >=10 && sortSessionData[i].deviceId <= 19)){
        deviceImageNumber = 1
      } else if ((sortSessionData[i].deviceId == 2 || (sortSessionData[i].deviceId >=20 && sortSessionData[i].deviceId <= 29))){
        deviceImageNumber = 2
      } else if ((sortSessionData[i].deviceId == 3 || (sortSessionData[i].deviceId >=30 && sortSessionData[i].deviceId <= 39))){
        deviceImageNumber = 3
      } else if ((sortSessionData[i].deviceId == 4 || (sortSessionData[i].deviceId >=40 && sortSessionData[i].deviceId <= 49))){
        deviceImageNumber = 4
      } else if ((sortSessionData[i].deviceId == 5 || (sortSessionData[i].deviceId >=50 && sortSessionData[i].deviceId <= 59))){
        deviceImageNumber = 5
      } else if ((sortSessionData[i].deviceId == 6 || (sortSessionData[i].deviceId >=60 && sortSessionData[i].deviceId <= 69))){
        deviceImageNumber = 6
      } else if ((sortSessionData[i].deviceId == 7 || (sortSessionData[i].deviceId >=70 && sortSessionData[i].deviceId <= 79))){
        deviceImageNumber = 7
      } else if ((sortSessionData[i].deviceId == 8 || (sortSessionData[i].deviceId >=80 && sortSessionData[i].deviceId <= 89))){
        deviceImageNumber = 8
      } else if ((sortSessionData[i].deviceId == 9 || (sortSessionData[i].deviceId >=90 && sortSessionData[i].deviceId <= 99))){
        deviceImageNumber = 9
      }
        

        function getAmountString(amount) {
          var unit = "mL";
          if (amount > 1000) {
            amount = parseInt(amount / 1000);
            unit = "L"
          }
          return amount + " " + unit;
        }
        
        $( ".append-water-table" ).hide().append( "<tr> <td> <img src='" +deviceImages[deviceImageNumber]+ "'> </td> <td>" + moment.unix(sortSessionData[i].startTime).format("MMM DD h:mm A") + "</td><td>" + getAmountString(sortSessionData[i].amount) + " </td> </tr>" ).fadeIn(800);
      
        
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

  

 