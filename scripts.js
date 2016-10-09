


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


  
  
  var rawData = firebase.database().ref('/rawdata/');
    rawData.on('value', function(snapshot) {
    var currentRawData = snapshot.val();
    console.log(currentRawData);
  });

  

  var waterFlowData0 = firebase.database().ref('/sessions/').once('value').then(function(snapshot) {

    var waterFlowDataValue0 = snapshot.val();
 
    console.log(waterFlowDataValue0);
    
    var amountData = [];
    var timeData = [];
    var deviceData = [];

      for (var key in waterFlowDataValue0) {
        if (waterFlowDataValue0.hasOwnProperty(key)) {
          amountData.push( waterFlowDataValue0[key].amount );
          timeData.push( waterFlowDataValue0[key].startTime );
          deviceData.push( waterFlowDataValue0[key].deviceId );
        };
      };

    console.log(amountData);
    console.log(deviceData);
    console.log(timeData);

    /*
    var allWaterFlowData = waterFlowDataValue0[300].amount;
    var allWaterFlowData2 = waterFlowDataValue0[300].deviceId;
    var allWaterFlowData3 = waterFlowDataValue0[300].startTime;

    var allWaterFlowData4 = waterFlowDataValue0[301].amount;
    var allWaterFlowData5 = waterFlowDataValue0[301].deviceId;
    var allWaterFlowData6 = waterFlowDataValue0[301].startTime;
    */

    $( "#1001-amount" ).text( amountData[0]);
    $( "#1001-device" ).text( deviceData[0]);
    $( "#1001-time" ).text( timeData[0] );
    $( "#1001-date" ).text( timeData[0] );

    $( "#1002-amount" ).text( amountData[1] );
    $( "#1002-device" ).text( deviceData[1]);
    $( "#1002-time" ).text( timeData[1] );
    $( "#1002-date" ).text( timeData[1] );   

    /*$(".water-flow-table tr").each(function () {
      $('td').each(function () {
     })
    })
    */
  
  });





  var waterFlowData = firebase.database().ref('/sessions/300').once('value').then(function(snapshot) {

    var waterFlowDataValue = snapshot.val().amount;
    // ...
    console.log(waterFlowDataValue);

    
    $( "#1001-amount" ).text( waterFlowDataValue + " liters");

  });

  var waterFlowData2 = firebase.database().ref('/sessions/300').once('value').then(function(snapshot) {
    var waterFlowDataValue2 = snapshot.val().deviceId;
    // ...
    console.log(waterFlowDataValue2);

    
    $( "#1001-device" ).text( waterFlowDataValue2 );

  });

  var waterFlowData3 = firebase.database().ref('/sessions/300').once('value').then(function(snapshot) {
    var waterFlowDataValue3 = snapshot.val().startTime;
    // ...
    console.log(waterFlowDataValue3);

    
    $( "#1001-time" ).text( waterFlowDataValue3 );
    $( "#1001-date" ).text( waterFlowDataValue3 );

  });



  



