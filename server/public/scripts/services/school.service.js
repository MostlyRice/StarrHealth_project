myApp.service('SchoolService', ['$http', '$location', 'UserService', function ($http, $location, UserService) {
    console.log('SchoolService Loaded');
    var self = this;

    self.addSchool = function(school) {
        console.log('school', school);
        if (school.school_codeOne != school.school_codeTwo) {
            alert('school codes do not match')
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
            console.log('schooln created');
        }).catch(function (error) {
            console.log('disclaimer error');
        })
    } else {
        alert('Something Went Wrong. Please Try Again');
        location.reload(true);
    }
}

}]); // end school service