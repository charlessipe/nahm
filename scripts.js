


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


  /*
  
  */

  var waterFlowData0 = firebase.database().ref('/sessions/').once('value').then(function(snapshot) {

    var waterFlowDataValue0 = snapshot.val();
    // ...
    console.log(waterFlowDataValue0);

    var allWaterFlowData = waterFlowDataValue0[300].amount;

    $( "#1001-amount" ).text( allWaterFlowData + " liquid");

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



  



