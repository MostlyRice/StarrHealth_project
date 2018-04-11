myApp.controller('AdminController', ['$http', 'UserService', '$location', 'AdminService', function($http, UserService, $location, AdminService) {
    console.log('AdminController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.id = UserService.userObject.id;

    self.adminHome = AdminService.adminHome;
    self.adminCreateCoach = AdminService.adminCreateCoach;
    self.coachDirectory = AdminService.coachDirectory;
    self.newSchool = AdminService.newSchool;
    self.schoolDirectory = AdminService.schoolDirectory;
    self.studentDirectory = AdminService.studentDirectory;
    self.adminAllApointments = AdminService.adminAllApointments;
    self.coachDir = AdminService.coachDir;
    self.collectCoach = AdminService.collectCoach;

}]);