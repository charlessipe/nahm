


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


  
  
  var rawData = firebase.database().ref('/test/');
    rawData.on('value', function(snapshot) { 
    var currentRawData = snapshot.val();

    $(".append-water-table").empty();


      for (var key in currentRawData) {
        if (currentRawData.hasOwnProperty(key)) {
          
          $(".current-flow").text(currentRawData[key].amount + " liters/second");

          $( ".append-water-table" ).hide().append( "<tr><td><img src='images/shower.png'>" + key + "</td> <td>" + currentRawData[key].time + "</td><td>" + currentRawData[key].amount + "</td> <td>" + currentRawData[key].deviceid + "</td></tr>" ).fadeIn(800);

          //$( "#1001-amount" ).append( "<td>" + currentRawData[key].amount + "</td>");
          console.log(currentRawData[key].amount);

      };

    };


    /*firebase.database().ref('/test/').once('value').then(function(snapshot) {
    var oldSessions = snapshot.val();
    // ...
    });*/


  });

  

 