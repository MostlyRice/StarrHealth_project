myApp.controller('SchoolController', ['UserService', '$location', 'SignupService', 'SchoolService', function (UserService, $location, SignupService, SchoolService) {
//  console.log('SchoolController created');
  var self = this;
  self.userService = UserService;
  self.signupService = SignupService;
  self.schoolService = SchoolService;
  self.userObject = UserService.userObject;
  self.id = UserService.userObject.id;

  self.addSchool = SchoolService.addSchool;

}]);