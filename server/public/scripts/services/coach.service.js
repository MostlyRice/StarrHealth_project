myApp.service('CoachService', ['$http', '$location', 'UserService', function($http, $location, UserService){
    console.log('CoachService Loaded');
    var self = this;


    self.coachHome = function() {
        $location.path('/coach_home');
    }
    self.coachAppointmenets = function() {
        $location.path('/coach_appointments');
    }
    self.coachSchedule = function() {
        $location.path('/coach_schedule');
    }
    self.coachStudents = function() {
        $location.path('/coach_students');
    }




}]); // end coach service