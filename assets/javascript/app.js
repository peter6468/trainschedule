console.log("hello")

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
      //prevents default behav wh/would wsubmit to back end
     event.preventDefault();

      //grab users input
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      //momentjs, want to turn this into actual time variable, turning our 1st train input into a unit variable
      //its converting everything to be on one line
      var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequencyInput").val().trim();

      console.log(trainName);
      console.log(destination);
      console.log(firstTrain);
      console.log(frequency);
      
      //return false;

      //create local "temp" object for holding train data
      var newTrain = {
          name: trainName,
          dest: destination,
          firstTime: firstTrain,
          freq: frequency,
      };
      //firebase reference, adding to firebase db
      trainData.ref().push(newTrain);

        console.log(trainName.name);
        console.log(destination.dest);
        console.log(firstTrain.firstTime);
        console.log(frequency.freq);

    // Clears all of the text-boxes
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

  });

 

  //firebase watcher and initial loader: this code behaves similarly to .on("value")(array)
  trainData.ref().on("child_added",function(snapshot){
      var trainName=snapshot.val().name;
      var destination=snapshot.val().dest;
      var frequency=snapshot.val().freq;
      var firstTrain=snapshot.val().firstTime;

      console.log(name, destination, frequency, firstTrain);
      console.log(snapshot.val());
      //() gives us the actual result, w/() gives us the actual function object

      var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
      var minutes = frequency - remainder;
      var arrival = moment().add(minutes,"m").format("hh:mm A");

      console.log(remainder);
      console.log(minutes);
      console.log(arrival);


      $("#trainTable > tBody").append("<tr><td>"+trainName+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");





  })

  function clock()  {
    
    const fullDate = new Date();
    var hours = fullDate.getHours();
    var mins = fullDate.getMinutes();
    var secs = fullDate.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    if (secs < 10) {
        secs = "0" + secs;
    }

    document.getElementById("hour").innerHTML = hours;
    document.getElementById("minute").innerHTML = ":" + mins;
    document.getElementById("second").innerHTML = ":" + secs;
}
 

    


setInterval(clock, 100);