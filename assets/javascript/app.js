console.log("hello")

// Initialize Firebase got from firebase page train project that i created
// Replaced with your project's customized code snippet
var config = {
    apiKey: "AIzaSyDp9wwiNDezERB-AH6cU-8SixNtoC_YfHU",
    authDomain: "trainschedule-ce13e.firebaseapp.com",
    databaseURL: "https://trainschedule-ce13e.firebaseio.com",
    projectId: "trainschedule-ce13e",
    storageBucket: "trainschedule-ce13e.appspot.com",
    messagingSenderId: "521271122790"

  };
  firebase.initializeApp(config);

  //get reference to database service
  var trainData = firebase.database();

  //jquery to connect to firebase, everytime i click on addTrainBtn its storing all the inputs
  $("#addTrainBtn").on("click", function(event){
      event.preventDefault();

      //grab users input
      var trainName = $("#trainNameInput").val().trim;
      var destination = $("#destinationInput").val().trim;
      //momentjs, want to turn this into actual time variable, turning our 1st train input into a unit variable
      //its converting everything to be on one line
      var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequencyInput").val().trim;

      console.log(firstTrain);
      return false;

      //create local "temp" object for holding train data
      var newTrain = {
          name: trainName,
          dest: destination,
          firstTime: firstTrain,
          freq: frequency,
      };

      trainData.ref().push(newTrain);

        console.log(trainName.name);
        console.log(destination.dest);
        console.log(firstTrain.firstTime);
        console.log(frequency.freq);
  })

 

  //firebase watcher and initial loader: this code behaves similarly to .on("value")
  trainData.ref().on("child_added",function(snapshot){
      var name=snapshot.val().name;
      var destination=snapshot.val().destination;
      var frequency=snapshot.val().frequency;
      var firstTrain=snapshot.val().firstTrain;

      var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
      var minutes = frequency - remainder;
      var arrival = moment().add(minutes,"m").format("hh:mm A");

      console.log(remainder);
      console.log(minutes);
      console.log(arrival);


      $("#trainTable > tBody").append("<tr><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");





  })
