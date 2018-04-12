myApp.service('SchoolService', ['$http', '$location', 'UserService', function($http, $location, UserService){
    console.log('SchoolService Loaded');
    var self = this;

    self.adminHome = function() {
        $location.path('/admin_Home');
    }

    self.collectSchool = function(school) {
        console.log('school', school);
        const entry = {
            school_name: school.school_name,
            school_code: school.school_code,
            total_accounts: school.total_accounts,
            student_sessions: school.student_sessions
        }
        $http({
            method: 'POST',
            url: '/admin/school',
            data: {entry: entry}
        }).then(function(response) {
            console.log('schooln created');
        }).catch(function(error) {
            console.log('disclaimer error');
        })
    }

}]); // end school service