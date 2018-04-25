myApp.controller('SuperAdminController', ['UserService', '$location', 'SuperAdminService', 'AdminService', function (UserService, $location, SuperAdminService, AdminService) {
 // console.log('SuperAdminController created');
  var self = this;
  self.userService = UserService;
  self.adminService = AdminService;
  self.userObject = UserService.userObject;
  self.superAdminHome = SuperAdminService.superAdminHome;
  self.superAdminCreateCoach = SuperAdminService.superAdminCreateCoach;
  self.superAdminNewSchool = SuperAdminService.superAdminNewSchool;
  self.superAdminStudentDirectory = SuperAdminService.superAdminStudentDirectory;
  self.superCoachDirectory = SuperAdminService.superCoachDirectory;
  self.superAdminSchoolDirectory = SuperAdminService.superAdminSchoolDirectory;
  self.superAdminAllAppointments = SuperAdminService.superAdminAllAppointments;
  self.superAdminCoachSchedule = SuperAdminService.superAdminCoachSchedule;
  self.superAdminCoachAllAppointments = SuperAdminService.superAdminCoachAllAppointments;
  self.allSchools = AdminService.allSchools;
  self.allCoaches = AdminService.allCoaches;
  self.deleteCoach = AdminService.deleteCoach;
  self.allStudents = AdminService.allStudents;
  self.deleteStudent = AdminService.deleteStudent;
  self.allAppts = AdminService.allAppts;

  AdminService.getSchools();
  AdminService.getCoaches();
  AdminService.getStudents();
  AdminService.getAppts();
  
}]);