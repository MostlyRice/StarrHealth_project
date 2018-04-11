myApp.service('SuperAdminService', ['$http', '$location', 'UserService', function($http, $location, UserService){
    console.log('AdminService Loaded');
    var self = this;

    self.superAdminHome = function() {
        $location.path('/admin_home');
    }
    self.studentDirectory = function() {
        $location.path('/student_directory');
    }
    self.coachDirectory = function() {
        $location.path('/coach_directory');
    }
    self.schoolDirectory = function() {
        $location.path('/school_directory');
    }
    self.adminCreateCoach = function() {
        $location.path('/create_coach');
    }
    self.newSchool = function() {
        $location.path('/new_school');
    }
    self.adminAllApointments = function() {
        $location.path('/admin_AllApointments');
    }
    self.coachSchedule = function() {
        $location.path('/coach_schedule');
    }
    self.coachAppointmenets = function() {
        $location.path('/coach_appointments');
    }
    
}]); // end Admin service