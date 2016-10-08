


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
  var starCountRef = firebase.database().ref('posts/' + postId + '/starCount');
  starCountRef.on('value', function(snapshot) {
    updateStarCount(postElement, snapshot.val());
  });

  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = snapshot.val().username;
    // ...
  });

  */

  /*
  var waterflow = firebase.database().ref('/id1');

  waterflow.on('value', function(snapshot) {
    updateStarCount(postElement, snapshot.val());
    console.log("session hi");
  });
  */


  var waterFlowData = firebase.database().ref('/sessions/300').once('value').then(function(snapshot) {
    var waterFlowDataValue = snapshot.val().amount;
    // ...
    console.log(waterFlowDataValue)
  });



  //shower-water-flow-381ec



