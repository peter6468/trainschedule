console.log("hello")

// Initialize Firebase got from
// TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);

  var trainData = firebase.database();

  //jquery to connect to firebase, everytime i click on addTrainBtn its stroeing all the inputs
  $("#addTrainBtn").on("click", function(){
      var trainName = $("#trainNameInput").val().trim;
      var destination = $("#destinationInput").val().trim;
      //momentjs, want to turn this into actual time variable, turning our 1st train input into a unit variable
      //its converting everything to be on one line
      var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequencyInput").val().trim;

      console.log(firstTrain);
      return false;
  })
