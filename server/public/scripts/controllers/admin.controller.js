myApp.controller('AdminController', ['$http', 'UserService', '$location', 'AdminService', function ($http, UserService, $location, AdminService) {
    console.log('AdminController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.id = UserService.userObject.id;

    self.adminHome = AdminService.adminHome;
    self.adminCreateCoach = AdminService.adminCreateCoach;
    self.adminNewSchool = AdminService.adminNewSchool;
    self.adminStudentDirectory = AdminService.adminStudentDirectory;
    self.adminCoachDirectory = AdminService.adminCoachDirectory;
    self.adminSchoolDirectory = AdminService.adminSchoolDirectory;
    self.adminAllApointments = AdminService.adminAllApointments;
}]);