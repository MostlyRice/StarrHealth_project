myApp.controller('CoachController', ['$http', 'UserService', '$location', 'CoachService', 'StudentService', function ($http, UserService, $location, CoachService, StudentService) {
  console.log('CoachController created');
  var self = this;
  self.userService = UserService;
  self.userObject = UserService.userObject;
  self.id = UserService.userObject.id;
  self.userName = UserService.userObject.userName;

  self.coachHome = CoachService.coachHome;
  self.coachAppointmenets = CoachService.coachAppointmenets;
  self.coachSchedule = CoachService.coachSchedule;
  self.coachStudents = CoachService.coachStudents;
  self.changePassword = StudentService.changePassword;
  self.newPassword = CoachService.newPassword;
  self.myself = CoachService.myself;
  self.saveCoach = CoachService.saveCoach;
  self.saveUserName = CoachService.saveUserName;
  self.upload = CoachService.upload;

  CoachService.getMe();
  console.log('myself', self.myself);

  self.cancelCoach = function (coach) {
    coach.editing = false;
  }

  self.editCoach = function (coach) {
    coach.editing = true;
  }

  self.cancelUserName = function () {
    self.editing = false;
  }

  self.editUserName = function () {
    self.editing = true;
  }
}]);