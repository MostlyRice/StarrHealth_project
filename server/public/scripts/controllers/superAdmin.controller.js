myApp.controller('SuperAdminController', ['UserService', '$location','SuperAdminService', function(UserService, $location, SuperAdminService) {
    console.log('SuperAdminController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    console.log(self.userObject);
    
    self.superAdminHome = SuperAdminService.superAdminHome;
    self.superAdminCreateCoach = SuperAdminService.superAdminCreateCoach;
    self.superCoachDirectory = SuperAdminService.superCoachDirectory;
    self.superAdminNewSchool = SuperAdminService.superAdminNewSchool;
    self.superSchoolDirectory = SuperAdminService.superSchoolDirectory;
    self.superAdminStudentDirectory = SuperAdminService.superAdminStudentDirectory;
    self.superAdminAllApointments = SuperAdminService.superAdminAllApointments;
    self.super_AdminCoachAllApointments = SuperAdminService.super_AdminCoachAllApointments;
    self.superCoachSchedule = SuperAdminService.superCoachSchedule;
    // self.coachDir = SuperAdminService.coachDir;
    // self.collectCoach = SuperAdminService.collectCoach;

  }]);