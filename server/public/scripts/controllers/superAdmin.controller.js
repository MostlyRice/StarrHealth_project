myApp.controller('SuperAdminController', ['UserService', '$location', 'CoachService','AdminService', function(UserService, $location, CoachService, AdminService) {
    console.log('JuliaController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    console.log(self.userObject);
    
    self.adminCreateCoach = AdminService.adminCreateCoach;
    self.coachDirectory = AdminService.coachDirectory;
    self.newSchool = AdminService.newSchool;
    self.schoolDirectory = AdminService.schoolDirectory;
    self.studentDirectory = AdminService.studentDirectory;
    self.adminAllApointments = AdminService.adminAllApointments;
    self.coachAppointmenets = CoachService.coachAppointmenets;
    self.coachSchedule = CoachService.coachSchedule;
    self.coachDir = SuperAdminService.coachDir;
    self.collectCoach = SuperAdminService.collectCoach;

  }]);