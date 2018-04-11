myApp.controller('StudentController', ['$http', 'UserService', '$location', 'StudentService', function($http, UserService, $location, StudentService) {
    console.log('StudentController created');
    var self = this;
    self.userService = UserService;
    self.studentService = StudentService;
    self.userObject = UserService.userObject;
    self.id = UserService.userObject.id;
    self.student = StudentService.student;
    self.newPassword = StudentService.newPassword;
    self.changePassword = StudentService.changePassword;


    StudentService.getStudent();


}]);