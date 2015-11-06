
Parse.Cloud.define("testPush", function(request, response) {
  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios');
  pushQuery.containedIn('channels', ['patient']);

  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
      alert: "Sending a push test by terminal..."
    }
  }, {
    success: function() {
      // Push was successful
      response.success("Push sent successfully!");
    },
    error: function(error) {
      response.error("Got an error " + error.code + ": " + error.message);
    }
  });
});

Parse.Cloud.define("notifyDoctors", function(request, response) {
  // After create a Call we pass the ID for this method
  var callID = request.params.callID;

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.containedIn('channels', ['doctors']);

  /*
  Insert logic to filter doctors near (based in miles) the patient
  */

  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
      alert: "Um paciente está a procura de um médico!",
      path: "/in-app-path/to/call/" + callID
    }
  }, {
    success: function() {
      // Push was successful
      response.success("Push sent successfully!");
    },
    error: function(error) {
      response.error("Got an error " + error.code + ": " + error.message);
    }
  });
});
