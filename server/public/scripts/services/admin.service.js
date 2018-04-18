myApp.service('AdminService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('AdminService Loaded');
    var self = this;

    self.adminHome = function () {
        $location.path('/admin_Home');
    }
    self.adminCreateCoach = function () {
        $location.path('/admin_CreateCoach');
    }
    self.adminNewSchool = function () {
        $location.path('/admin_NewSchool');
    }
    self.adminStudentDirectory = function () {
        $location.path('/admin_StudentDirectory');
    }
    self.adminCoachDirectory = function () {
        $location.path('/admin_CoachDirectory');
    }
    self.adminSchoolDirectory = function () {
        $location.path('/admin_SchoolDirectory');
    }

    self.adminAllApointments = function () {
        $location.path('/admin_AllApointments');
    }

    self.coachDir = function () {
        $location.path('/admin_Home');
    }


}]); // end Admin service