myApp.controller('StudentController', ['$http', 'UserService', '$location', 'StudentService', function($http, UserService, $location, AdminService) {
    console.log('StudentController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.id = UserService.userObject.id;


}]);