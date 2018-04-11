myApp.controller('SuperAdminController', ['UserService', '$location', function(UserService, $location) {
    console.log('JuliaController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    console.log(self.userObject);



  }]);