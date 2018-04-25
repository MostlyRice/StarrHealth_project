myApp.controller('StudentController', ['$http', 'UserService', '$location', 'StudentService', 'SignupService', function ($http, UserService, $location, StudentService, SignupService) {
//  console.log('StudentController created');
  var self = this;
  self.userService = UserService;
  self.studentService = StudentService;
  self.userObject = UserService.userObject;
  self.id = UserService.userObject.id;
  self.student = StudentService.student;
  self.newPassword = StudentService.newPassword;
  self.changePassword = StudentService.changePassword;
  self.returnFromPass = StudentService.returnFromPass;
  self.saveBio = StudentService.saveBio;
  self.getMyCoach = SignupService.getMyCoach;
  self.appointment = StudentService.appointment;
  self.myPastAppts = StudentService.myPastAppts;
  self.myAppts = StudentService.myAppts;
  


  self.studentHome = StudentService.studentHome;
  self.studentCoach = StudentService.studentCoach;
  self.studentSchedule = StudentService.studentSchedule;

  StudentService.getStudent();

  self.cancelBio = function () {
    self.editing = false;
  }

  self.editBio = function () {
    self.editing = true;
  } 

}]);