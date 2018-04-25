myApp.service('SchoolService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
 //   console.log('SchoolService Loaded');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.addSchool = function (school) {
        if (school.school_codeOne != school.school_codeTwo) {
            swal("School codes do not match!", "", "warning");
        } else if (school.school_codeOne === school.school_codeTwo) {
            const entry = {
                school_name: school.school_name,
                school_code: school.school_codeOne,
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
                swal("Added School!", "", "success");
                let role = UserService.userObject.user_role;
                if (role === 3) {
                    $location.path('/admin_Home');
                } else if (role === 4) {
                    $location.path('/super_AdminHome');
                }
            }).catch(function (error) {
             //   console.log('disclaimer error');
            })
        } else {
            swal("Something Went Wrong!", "", "warning");
            location.reload(true);
        }
    }

}]); // end school service