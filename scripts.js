


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

    //$(".append-water-table").empty();

    var reverseSessionData = [];

      for (var key in currentRawData) {
        if (currentRawData.hasOwnProperty(key)) {
          
          reverseSessionData.push(currentRawData[key]);
          reverseSessionData.reverse();

          $(".current-flow").text(currentRawData[key].amount + " liters/second");

          //$( ".append-water-table" ).hide().append( "<tr><td><img src='images/shower.png'>" + key + "</td> <td>" + currentRawData[key].time + "</td><td>" + currentRawData[key].amount + "</td> <td>" + currentRawData[key].deviceid + "</td></tr>" ).fadeIn(800);

          

      };

      console.log(reverseSessionData);
      
      $(".append-water-table").empty();

      for (var i = 0; i < reverseSessionData.length; i ++){
        
        $( ".append-water-table" ).hide().append( "<tr><td><img src='images/shower.png'>" + i + "</td> <td>" + reverseSessionData[i].time + "</td><td>" + reverseSessionData[i].amount + "</td> <td>" + reverseSessionData[i].deviceid + "</td></tr>" ).fadeIn(800);
      
      }


    };


    /*firebase.database().ref('/test/').once('value').then(function(snapshot) {
    var oldSessions = snapshot.val();
    // ...
    });*/


  });

  

 