myApp.controller('StudentController', ['$http', 'UserService', '$location', 'StudentService', 'SignupService', function ($http, UserService, $location, StudentService, SignupService) {
  console.log('StudentController created');
  var self = this;
  self.userService = UserService;
  self.studentService = StudentService;
  self.userObject = UserService.userObject;
  self.id = UserService.userObject.id;
  self.student = StudentService.student;
  self.newPassword = StudentService.newPassword;
  self.changePassword = StudentService.changePassword;
  self.saveBio = StudentService.saveBio;
  self.getMyCoach = SignupService.getMyCoach;



  StudentService.getStudent();
  console.log('t', self.student);

  self.cancelBio = function () {
    self.editing = false;
  }

  self.editBio = function () {
    self.editing = true;
  }

}]);