myApp.controller('SuperAdminController', ['UserService', '$location','SuperAdminService', function(UserService, $location, SuperAdminService) {
    console.log('SuperAdminController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    console.log(self.userObject);
    
    self.superAdminHome = SuperAdminService.superAdminHome;
    self.superAdminCreateCoach = SuperAdminService.superAdminCreateCoach;
    self.superAdminNewSchool = SuperAdminService.superAdminNewSchool;
    self.superAdminStudentDirectory = SuperAdminService.superAdminStudentDirectory;
    self.superCoachDirectory = SuperAdminService.superCoachDirectory;
    self.superAdminSchoolDirectory = SuperAdminService.superAdminSchoolDirectory;
    self.superAdminAllAppointments = SuperAdminService.superAdminAllAppointments;
    self.superAdminCoachSchedule = SuperAdminService.superAdminCoachSchedule;
    self.superAdminCoachAllAppointments = SuperAdminService.superAdminCoachAllAppointments;
  }]);

