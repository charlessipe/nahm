


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


  // display current amount
  var currentFlow = firebase.database().ref('/rawdata/');
    currentFlow.on('value', function(snapshot) {
    var currentFlowData = snapshot.val();

    for (var key in currentFlowData) {
        if (currentFlowData.hasOwnProperty(key)) {

          $(".current-flow").text(currentFlowData[key].amount + " mililiters");

          //$( ".append-water-table" ).hide().append( "<tr><td><img src='images/shower.png'>" + key + "</td> <td>" + currentRawData[key].time + "</td><td>" + currentRawData[key].amount + "</td> <td>" + currentRawData[key].deviceid + "</td></tr>" ).fadeIn(800);  
        }
    };

  });
  
  
  var rawData = firebase.database().ref('/sessions/');
    rawData.on('value', function(snapshot) { 
    var currentRawData = snapshot.val();

    //$(".append-water-table").empty();

    var sortSessionData = [];

      for (var key in currentRawData) {
        if (currentRawData.hasOwnProperty(key)) {
          
          sortSessionData.push(currentRawData[key]);
          //reverseSessionData.reverse();

          //$(".current-flow").text(currentRawData[key].amount + " liters/second");

          //$( ".append-water-table" ).hide().append( "<tr><td><img src='images/shower.png'>" + key + "</td> <td>" + currentRawData[key].time + "</td><td>" + currentRawData[key].amount + "</td> <td>" + currentRawData[key].deviceid + "</td></tr>" ).fadeIn(800);       

      };

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
          var unit = "ML";
          if (amount > 1000) {
            amount = parseInt(amount / 1000);
            unit = "L"
          }
          return amount + " " + unit;
        }
        
        $( ".append-water-table" ).hide().append( "<tr> <td> <img src='" +deviceImages[sortSessionData[i].deviceId]+ "'> </td> <td>" + moment.unix(sortSessionData[i].startTime).format("MMM DD, YYYY HH:mm A") + "</td><td>" + getAmountString(sortSessionData[i].amount) + " </td> </tr>" ).fadeIn(800);
      
        console.log("hi");
      }


    };


    /*firebase.database().ref('/test/').once('value').then(function(snapshot) {
    var oldSessions = snapshot.val();
    // ...
    });*/



  });

  

 