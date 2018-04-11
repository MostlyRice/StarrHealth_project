myApp.service('StudentService', ['$http', '$location', 'UserService', function($http, $location, UserService){
    console.log('StudentService Loaded');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.student = {
        list:[]
    }

    self.getStudent = function() {
        const id = UserService.userObject.id;
        $http({
            method: 'GET',
            url: `/student/${id}`
        }).then(function(response) {
            console.log(response.data);
            self.student.list = response.data;
            console.log('thisStudent = ', self.student.list);
        }).catch(function(error) {
            console.log('coach match error');
        })
    } // end getStudent

    self.newPassword = function() {
        $location.path('/student_password');
    } // end newPassword

    self.changePassword = function(auth) {
        console.log('AUTH = ', auth);
        
    } // end changePassword

}]); // end student service