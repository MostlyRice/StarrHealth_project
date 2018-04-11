myApp.service('AdminService', ['$http', '$location', 'UserService', function($http, $location, UserService){
    console.log('AdminService Loaded');
    var self = this;

    self.adminHome = function() {
        $location.path('/admin_home');
    }
    self.adminCreateCoach = function() {
        $location.path('/create_coach');
    }
    self.coachDirectory = function() {
        $location.path('/coach_directory');
    }
    self.newSchool = function() {
        $location.path('/new_school');
    }
    self.schoolDirectory = function() {
        $location.path('/school_directory');
    }
    self.studentDirectory = function() {
        $location.path('/student_directory');
    }
    self.adminAllApointments = function() {
        $location.path('/admin_AllApointments');
    }

}]); // end Admin service