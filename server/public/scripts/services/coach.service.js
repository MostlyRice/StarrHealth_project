myApp.service('CoachService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('CoachService Loaded');
    var self = this;
    self.client = filestack.init("AYpvE9ArwS6eQkUSqQxtLz");

// Still need to add the router side post for adding images!!!
    self.upload = function(){
      console.log('In upload');
      self.client.pick({
        accept:'image/*',
        maxFiles: 1
      }).then(function(result){
        alert("Upload succesfull");
        self.newSpot.imgUrl = result.filesUploaded[0].url;
        console.log('This is the img:', self.newSpot.imgUrl);
      })
    }



    self.coachHome = function () {
        $location.path('/coach_Home');
    }
    self.coachAppointmenets = function () {
        $location.path('/coach_Appointments');
    }
    self.coachSchedule = function () {
        $location.path('/coach_Schedule');
    }
    self.coachStudents = function () {
        $location.path('/coach_Students');
    }

}]); // end coach service