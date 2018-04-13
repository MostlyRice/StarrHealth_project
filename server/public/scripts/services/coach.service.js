myApp.service('CoachService', ['$http', '$location', 'UserService', function($http, $location, UserService){
    console.log('CoachService Loaded');
    var self = this;


    self.coachHome = function() {
        $location.path('/coach_Home');
    }
    self.coachAppointmenets = function() {
        $location.path('/coach_Appointments');
    }
    self.coachSchedule = function() {
        $location.path('/coach_Schedule');
    }
    self.coachStudents = function() {
        $location.path('/coach_Students');
    }




}]); // end coach service