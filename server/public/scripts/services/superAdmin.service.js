myApp.service('SuperAdminService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
 //   console.log('SuperAdminService Loaded');
    var self = this;

    self.superAdminHome = function () {
        $location.path('/super_AdminHome');
    }
    self.superAdminStudentDirectory = function () {
        $location.path('/super_AdminStudentDirectory');
    }
    self.superCoachDirectory = function () {
        $location.path('/super_AdminCoachDirectory');
    }
    self.superAdminSchoolDirectory = function () {
        $location.path('/super_AdminSchoolDirectory');
    }
    self.superAdminCreateCoach = function () {
        $location.path('/super_AdminCreateCoach');
    }
    self.superAdminNewSchool = function () {
        $location.path('/super_AdminNewSchool');
    }
    self.superAdminAllAppointments = function () {
        $location.path('/super_AdminAllAppointments');
    }
    self.superAdminCoachSchedule = function () {
        $location.path('/super_AdminCoachSchedule');
    }
    self.superAdminCoachAllAppointments = function () {
        $location.path('/super_AdminCoachAllAppointments');
    }

    self.addSchool = function (school) {
        const entry = {
            school_name: school.school_name,
            school_code: school.school_code,
            total_accounts: school.total_accounts,
            student_sessions: school.student_sessions
        }
        $http({
            method: 'POST',
            url: '/admin/school',
            data: {
                entry: entry
            }
        }).then(function (response) {
        }).catch(function (error) {
           // console.log('disclaimer error');
        })
    }

}]); // end Admin service